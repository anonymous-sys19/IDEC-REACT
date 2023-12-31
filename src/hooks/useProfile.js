import { useState, useEffect } from 'react';
import { supabase } from '../routes/Auth/supabaseClient';

export default function UseProfile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [session, setSession] = useState(null);

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
    }
  }

  useEffect(() => {

    // eslint-disable-next-line no-unused-vars
    const { data, error } = supabase.auth.getSession();
    setSession(data);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      authListener.subscription;
    };
  }, []);

  useEffect(() => {
    async function getProfile() {
      if (session) {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select(`username, website, avatarUrl`)
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatarUrl);
        }

        setLoading(false);
      }
    }

    getProfile();
  }, [session]);

  return { loading, username, website, avatarUrl, downloadImage };
}