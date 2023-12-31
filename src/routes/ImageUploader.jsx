// src/components/ImageUploader.jsx
import { useState } from 'react';
import { supabase } from './Auth/supabaseClient';
const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
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
            }
          ],
          { onConflict: ['url'] }
        );
      console.error('Error al insertar en la base de datos:', imageError);

      if (imageError) {
        throw imageError;
      }

      alert('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      alert('Error al subir la imagen');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="text" placeholder="Descripción" value={description} onChange={handleDescriptionChange} />
      <button onClick={handleUpload}>Subir Imagen</button>
    </div>
  );
};

export default ImageUploader;
