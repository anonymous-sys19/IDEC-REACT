/* eslint-disable no-unused-vars */
// src/components/ImageUploader.jsx
import { useEffect, useState } from 'react';
import { supabase } from './Auth/supabaseClient';
import { UserAuth } from './Auth/AuthContext';
import { FcUpload } from "react-icons/fc";
import { FaImages } from "react-icons/fa";

// eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  const [nombreArchivo, setNombreArchivo] = useState('');

  const handleImageChange = (e) => {
    const nombreArchivo = e.target.files[0];
    // Limpiar el nombre del archivo: reemplazar espacios con guiones bajos

    setImage(URL.createObjectURL(nombreArchivo));
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


  return (
    <article className="ArticleUpload" id='ArticleUpload'>
      <div className="text-center">
        {/* <div className="title py-5">
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
        </div> */}

        <div className="">
          <div className="cont-Form">
            <form
              encType="multipart/form-data"
              onSubmit={handleUpload}>

              <div className="container-items" >
                <div className='container-Upload'>
                  {isAuthenticated ? (
                    <div>
                      {user?.picture && <img className='imgNav' src={user?.picture} alt={user} />}
                    </div>
                  ) : (
                    <div style={{
                      margin: '0 0 0 10px',
                      bottom: '10px',
                    }}>
                      {<img className='imgNav' src="/" alt='' />}
                    </div>
                  )}

                </div>
                <div className='input-Description'>
                  <input type="text" placeholder={"¿Que estás pensando, " + user.name + "?"} value={description} onChange={handleDescriptionChange} />

                </div>
                <div className='changeImage'>
                  <input onChange={handleImageChange} accept='image/*' type="file" name="file-5" id="file-5" className="inputfile inputfile-5" required multiple />
                  <label htmlFor="file-5">
                    <figure>
                      <FaImages className='iborrainputfile' />

                    </figure>
                    {/* <span className="iborrainputfile">{nombreArchivo.name || ''}</span> */}
                  </label>

                </div>
                <div className="btn-share">
                  <li style={{ listStyle: 'none' }}>

                    {nombreArchivo ? (
                      isAuthenticated ? (
                        <button className="btn btn-success" type='submit'>
                          <FcUpload />  Share
                        </button>
                      ) : (
                        <a className="btn" style={{ color: 'blue', }} href='/register'>
                          Login
                        </a>
                      )
                    ) : (
                      ""
                    )}
                  </li>
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
        <div className='"container text-center'>

        </div>
        <div className='row'>
          <div className="col">
            <div>
              {nombreArchivo ? (
                <img className='iborrainputfile' src={image} style={{
                  widows: 'auto',
                  height: '-webkit-fit-content'
                }} />) : ""}

            </div>
          </div>
        </div>

      </div>
    </article>
  )
}

export default Upload