// UserAvatar.js
import  { useEffect, useState } from 'react';
import { supabase } from '../routes/Auth/supabaseClient';

const UserAvatar = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error.message);
      } finally {
        setLoading(false);
      }
    }

    async function getProfileById() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`avatarUrl`)
          .eq('id', userId)
          .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          if (data.avatarUrl) {
            // Si hay una URL de avatar en el perfil, la usamos directamente
            setAvatarUrl(data.avatarUrl);
            setLoading(false);
          } else {
            // Si no hay una URL de avatar, intentamos descargarla desde el almacenamiento
            await downloadImage(userId);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        setLoading(false);
      }
    }

    if (userId) {
      getProfileById();
    }

  }, [userId]);

  return { loading, avatarUrl };
};

export default UserAvatar;
