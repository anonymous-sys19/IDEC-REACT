/* eslint-disable no-unused-vars */
// src/components/ImageUploader.jsx
import { useEffect, useState } from 'react';
import { supabase } from './Auth/supabaseClient';
import { UserAuth } from './Auth/AuthContext';
import { FcUpload } from "react-icons/fc";
import { FaImages } from "react-icons/fa";
import { AiFillDelete } from 'react-icons/ai';
// box to img List
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// eslint-disable-next-line no-unused-vars
import { SuccessNotification, ErrorNotification, WarningNotification } from '../hooks/HooksAlerts';

const Upload = () => {

  const { session, signout, user } = UserAuth();

  // TODO: Verifica si hay una sesión

  const isAuthenticated = user.email;


  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [OneUser, setUser] = useState()
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log("supabase event: ", event);
        if (session == null) {
          // console.log('No hay Session');

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


  const [image, setImage] = useState([]);
  const [imageViews, setImageViews] = useState([])
  const [description, setDescription] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [nombreArchivo, setNombreArchivo] = useState('');

 
  const handleImageChange = (e) => {
    const nuevosArchivos = e.target.files;

    // const nuevosArchivos = e.target.files;

    // Actualizar el array de imágenes
    setImage((prevImages) => [...prevImages, ...nuevosArchivos]);
    // Actualizar el array de vistas previas de imágenes
    const nuevasVistas = Array.from(nuevosArchivos).map((archivo) =>
      URL.createObjectURL(archivo)
    );
    setImageViews((prevViews) => [...prevViews, ...nuevasVistas]);
    // Actualizar el array de nombres de archivos
    setNombreArchivo((prevNombres) => [
      ...prevNombres,
      ...Array.from(nuevosArchivos, (archivo) => archivo.name),
    ]);

  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRemove = (index) => {
    // setImage()
    // setDescription("#Tiempos de Gloria")
    // Eliminar la imagen del array de imágenes
    setImage((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    // Actualizar el array de vistas previas y nombres de archivos
    setImageViews((prevViews) => {
      const newViews = [...prevViews];
      newViews.splice(index, 1);
      return newViews;
    });
    setNombreArchivo((prevNombres) => {
      const newNombres = [...prevNombres];
      newNombres.splice(index, 1);
      return newNombres;
    });


  }


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || image.length === 0) {
      return; //<showSuccessNotification/> //FKJSQDFHE
    }
    try {
      //  TODO: Limpiar el nombre del archivo: reemplazar espacios con guiones bajos
      // const cleanedFileName = image.name.replace(/\s/g, '_');
 
      const cleanedImages = image.map((file, index) => {
        const cleanedFileName = file.name.replace(/\s/g, '_');
        console.log(`Archivo ${index + 1}:`, cleanedFileName);
        // return { ...file, cleanedFileName };

        // Añadir el tipo MIME al objeto File
        const newFile = new File([file], cleanedFileName, { type: file.type });

        return newFile;
      });

      // console.log(cleanedFileName);
      // const { data, error } = await supabase.storage.from("idec-public").upload(`images/${cleanedFileName}`, image);

      // if (error) {
      //   throw error;
      // }
      console.log("Name",cleanedImages);
      console.log("Name.nme", cleanedImages.name);
      for (const cleanedImage of cleanedImages) {
        const { data, error } = await supabase.storage.from("idec-public").upload(`images/${cleanedImage.name}`, cleanedImage);

        if (error) {
          throw error;
        }

        // Resto de la lógica para almacenar información asociada a la imagen en la base de datos

        // Obten la URL de la imagen subida
        const imageUrl = data.fullPath;
        // console.log(imageUrl);
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
      }
    } catch (error) {
      // Si hay un error:
      console.log(error);
      setIsError(true);
      setIsSuccess(false);

    }
    setImage([""])
    setNombreArchivo([""])
    setDescription("#TiemposDeGloria")


  };


  return (
    <article className="ArticleUpload" id='ArticleUpload'>
      <div className="text-center">


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
                  {/* <input type='text'  /> */}
                  <textarea cols={40} rows='1' placeholder={"¿Que estás pensando, " + user.name + "?"} value={description} onChange={handleDescriptionChange} />
                </div>
                <div className='btn-btnChanges'>
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
                          <button className="btn" type='submit'>
                            <FcUpload />
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


        {imageViews[0] && (
          <Box sx={{ maxWidth: 900, maxHeight: 450, overflowY: 'scroll', margin: 'auto' }}>
            <ImageList className='container cont-img-Change' variant="quilted" cols={3}  rowHeight={121}>
              {imageViews.map((url, index) => (
                <>
                  <ImageListItem key={index}>
                    <span onClick={() => handleRemove(index)} className='btn-clear'>
                      <AiFillDelete />
                    </span>
                    <img className='iborrainputfile'
                      srcSet={url}
                      src={url}
                      alt={`Imagen ${index}`}
                      loading="lazy"
                    />
                  </ImageListItem>


                </>
              ))}

            </ImageList>
          </Box>
        )}
      </div>
    </article>
  )
}

export default Upload