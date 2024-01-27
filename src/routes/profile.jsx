/* eslint-disable react/prop-types */
// UserList.js
import { useEffect, useState } from 'react';
import {supabase} from '../routes/Auth/supabaseClient'

// Importa las dependencias necesarias

import { useParams } from 'react-router-dom';  // Importa 'useParams' de react-router-dom

const Perfil = () => {
  const { userId } = useParams();  // Obtén el 'userId' de los parámetros de la URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Realizar la consulta a la tabla 'public.Users' con la condición 'WHERE id = userId'
        const { data, error } = await supabase
          .from('idectableimages')
          .select('*')
          .eq('id', userId);

        if (error) {
          throw error;
        }

        setUserData(data[0]);  // Supongo que solo esperas un usuario, por lo que tomo el primer elemento del array
      } catch (error) {
        console.error('Error al recuperar el perfil del usuario:', error.message);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (!userId) {
    return <div>Usuario no encontrado</div>;  // Manejar el caso en que no se proporciona un userId válido
  }

  return (
    <div>
      <h2>Perfil del Usuario con id: {userId}</h2>
      {userData && (
        <div>
          <p>Nombre: {userData.nombre}</p>
          {/* Ajusta esto según la estructura de tu usuario */}
        </div>
      )}
    </div>
  );
};

export default Perfil;

