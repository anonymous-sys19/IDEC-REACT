/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import Card from '../components/CardAvatar';
import { useEffect, useState } from 'react';
import { supabase } from '../routes/Auth/supabaseClient'

import { useParams } from 'react-router-dom';  // Importa 'useParams' de react-router-dom
import Upload from './ImageUploader';
// FIXME:  importo el context de session
import { UserAuth } from './Auth/AuthContext';

import RenderPost from '../components/RenderPost';


function Perfil() {

  // // Verifica si hay una sesión
  const { user, session, signout, } = UserAuth();
  const isAuthenticated = user.email;
  console.log('User:', user);
  console.log('Session:', session);

  const { userId } = useParams();  // FIXME: Accede al valor específico 'userId' del objeto devuelto por 'useParams'
  const [nUser, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: users, error: usersError } = await supabase
          .from('idectableimages')
          .select('*')
          .eq('user_id', userId);


        if (users && users.length > 0) {
          // FIXME: El usuario existe, muestra la información del usuario
          setUser(users[0]);
          // FIXME: Considera el primer resultado si hay varios usuarios con el mismo ID
        } else {
          // FIXME: El usuario no existe, pod rías manejar esto de alguna manera (mostrar un mensaje, redirigir, etc.)
          console.log('Usuario no encontrado');
        }
        console.log('Users:', users);
        console.error('Error fetching users:', usersError);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [userId]);
  //  FIXME: Ahora depende del cambio en el parámetro de la URL
 



  const fetchImages = async () => {
    try {
      const { data: fileData, error: fileError } = await supabase.storage.from('idec-public').list('images/');

      if (fileError) {
        throw fileError;
      }

      const images = await Promise.all(fileData.map(async (file) => {
        const encodedFileName = encodeURIComponent(file.name);
        const url = `idec-public/images/${encodedFileName}`;

        try {
          const { data: imageData, error: imageError } = await supabase
            .from('idectableimages')
            .select()
            .eq('url', url)
            .maybeSingle();


          return {
            name: file.name,
            url: `https://janbrtgwtomzffqqcmfo.supabase.co/storage/v1/object/public/idec-public/images/${file.name}`,
            uid: imageData.user_id,
            description: imageData.description,
            createdAt: imageData.created_at,
            avatar_url: imageData.avatarUrl,
            name_Username: imageData.nameUser,
          };
        } catch (error) {
          console.error('Error al procesar la imagen:', error.message);
          return null;
        }
      }));

      const filteredImages = images.filter((image) => image !== null);
      setImageList(filteredImages);
    } catch (error) {
      console.error('Error al obtener la lista de imágenes:', error.message);
    }
  };

  useEffect(() => {
    fetchImages()

  }, []);
  const [imageList, setImageList] = useState([]);

  return (
    <div>
      {nUser && (
        <div>

          <Card
            avatar={nUser.avatarUrl}
            email={nUser.email}
            username={nUser.nameUser}
            publicaciones={'Publicaciones'}
            fotos={'Fotos'}
            videos={'Videos'}
            treePountInformation={'Tres puntos'}
          />
          {nUser.email === isAuthenticated ? (
            <>

              <Upload />

              <>
                <article>

                  {imageList.map((image) =>
                    <>
                      {nUser.user_id == image.uid ? (

                        <RenderPost key={image.name} image={image} nUser={nUser} />
                      ) : ""}
                    </>
                  )}

                </article>
              </>
            </>
          ) : (
            <>
              <article>

                {imageList.map((image) =>
                  <>
                    {nUser.user_id == image.uid ? (
                      <RenderPost key={image.name} image={image} nUser={nUser} />

                    ) : ""}
                  </>
                )}

              </article>
            </>
          )}
        </div>


      )}

    </div>
  );
}


export default Perfil;

