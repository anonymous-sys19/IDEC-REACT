// src/components/ImageUploader.jsx
import { useEffect, useState } from 'react';
import { supabase } from './Auth/supabaseClient';
import { UserAuth } from './Auth/AuthContext';
import { FcUpload } from "react-icons/fc";

import { SuccessNotification, ErrorNotification, WarningNotification } from '../hooks/HooksAlerts';

const Upload = () => {

  const { session, signout, user } = UserAuth();
  // Verifica si hay una sesión
  const isAuthenticated = user.email;


  console.log(isAuthenticated);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [OneUser, setUser] = useState()
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("supabase event: ", event);
        if (session == null) {
          console.log('No hay Session');

        }
        else {
          setUser(session?.user);
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, [])


  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [nombreArchivo, setNombreArchivo] = useState('');

  const handleImageChange = (e) => {
    const nombreArchivo = e.target.files[0];
    // Limpiar el nombre del archivo: reemplazar espacios con guiones bajos



    setImage(nombreArchivo);
    setNombreArchivo(nombreArchivo);


  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      return //<showSuccessNotification/> //FKJSQDFHE
    }

    try {
      // Limpiar el nombre del archivo: reemplazar espacios con guiones bajos
      const cleanedFileName = image.name.replace(/\s/g, '_');

      const { data, error } = await supabase.storage.from("idec-public").upload(`images/${cleanedFileName}`, image);

      if (error) {
        throw error;
      }

      // Obten la URL de la imagen subida
      const imageUrl = data.fullPath;
      console.log(imageUrl);
      if (!imageUrl) {
        // console.error('La URL de la imagen es nula.');
        return;
      }
      // Ahora puedes almacenar la información asociada a la imagen en tu base de datos
      // eslint-disable-next-line no-unused-vars
      const { data: imageData, error: imageError } = await supabase
        .from("idectableimages")
        .upsert(
          [
            {
              url: imageUrl,
              description,
              user_id: OneUser?.id,
              email: OneUser?.email,
              nameUser: OneUser?.user_metadata?.name,
              avatarUrl: OneUser?.user_metadata?.avatar_url,



            }
          ],
          { onConflict: ['url'] }
        );

      if (imageError) {
        throw imageError;
      }


      // alert('Imagen subida exitosamente');


      setIsSuccess(true);
      setIsError(false);

      setTimeout(() => {
        // Restablece el estado después de 2 segundos
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
    } catch (error) {
      // Si hay un error:
      setIsError(true);
      setIsSuccess(false);

    }
    setImage("")
    setNombreArchivo("")
    setDescription("#TiemposDeGloria")


  };
  // if (isAuthenticated) {
  //   handleUpload()
  // }
  // else {
  //   <WarningNotification message={"No has iniciado session😑"} />
  // }


  return (
    <article className="ArticleUpload" id='ArticleUpload'>
      <div className="container text-center">
        <div className="title py-5">
          <div className='ContainerUpload'>
            <div>
              <img src="/images/logo-idec.png" style={{
                width: '65px',
                height: '90px',
              }} alt="images" />
            </div>
            <div className='TitleIdecUpload'>
              <h1>IDEC UPLOAD</h1>
            </div>
          </div>
        </div>

        <div className="">
          <div className="cont-Form">
            <form
              // action="/Upload"
              encType="multipart/form-data"
              // method="post"
              onSubmit={handleUpload}>

              <div className="">
                <div className="" style={{

                }}>
                  <div className="container-input" style={{

                  }}>
                    <input onChange={handleImageChange} accept='image/*' type="file" name="file-5" id="file-5" className="inputfile inputfile-5" required />
                    <label htmlFor="file-5">
                      <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" className="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                      </figure>
                      <span className="iborrainputfile">{nombreArchivo.name || 'Seleccionar archivo'}</span>
                    </label>

                    <div>
                      <input type="text" placeholder="Desccription" value={description} onChange={handleDescriptionChange} style={{
                        margin: '2rem auto',
                        width: '80%',

                      }} />
                    </div>
                    <div className="colB">
                      <li style={{ listStyle: 'none' }}>

                        {isAuthenticated ? (
                          <button
                            className="btn btn-warning"
                            type='submit'
                          >
                            <FcUpload />
                            Compartir</button>
                        ) : (
                          <a
                            className="btn btn-warning"
                            href='/login'
                          >
                            <FcUpload />
                            Inicia session</a>
                        )}

                      </li>
                    </div>

                  </div>
                </div>
              </div>

              {/* Condición para mostrar notificaciones */}
              {isSuccess && (
                <SuccessNotification message="Imagen subida exitosamente 😊" success={isSuccess} />
              )}
              {isError && (
                <ErrorNotification message="Algo salió mal 😁" success={isError} />
              )}

            </form>
          </div>
        </div>

      </div>
    </article>
  )
}

export default Upload