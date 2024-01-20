// src/components/ImageUploader.jsx
import { useEffect, useState } from 'react';
import { supabase } from './Auth/supabaseClient';

import { FcUpload } from "react-icons/fc";

const Upload = () => {
  const [user, setUser] = useState()
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

  console.log("UNO", user?.user_metadata?.name);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [nombreArchivo, setNombreArchivo] = useState('');

  const handleImageChange = (e) => {
    const nombreArchivo = e.target.files[0];
    setImage(nombreArchivo);
    setNombreArchivo(nombreArchivo)

  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Selecciona una imagen primero');
      return;
    }

    try {
      const { data, error } = await supabase.storage.from("idec-public").upload(`images/${image.name}`, image);
      console.log('Datos de la imagen subida:', data);

      if (error) {
        throw error;
      }

      // Obten la URL de la imagen subida
      const imageUrl = data.fullPath;
      console.log(imageUrl);
      if (!imageUrl) {
        console.error('La URL de la imagen es nula.');
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
              user_id: user?.id,
              email: user?.email,
              nameUser: user?.user_metadata?.name,
              avatarUrl: user?.user_metadata?.avatar_url,



            }
          ],
          { onConflict: ['url'] }
        );

      if (imageError) {
        throw imageError;
      }

      alert('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert('Error al subir la imagen');
    }
    setImage("")
    setNombreArchivo("")
    setDescription("#TiemposDeGloria")
  };


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
              onSubmit={handleUpload}
              className='formUploads'
            >
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
                        <button
                          className="btn btn-warning"
                          type='submit'
                        >
                          <FcUpload />
                          Compartir</button>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </article>
  )
}

export default Upload