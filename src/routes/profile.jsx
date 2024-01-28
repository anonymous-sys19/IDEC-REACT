/* eslint-disable react/prop-types */
// UserList.js
import Card from '../components/CardAvatar';
import { useEffect, useState } from 'react';
import { supabase } from '../routes/Auth/supabaseClient'

import { useParams } from 'react-router-dom';  // Importa 'useParams' de react-router-dom
import Upload from './ImageUploader';


function Perfil() {
  const { userId } = useParams();  // Accede al valor específico 'userId' del objeto devuelto por 'useParams'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: users, error: usersError } = await supabase
          .from('idectableimages')
          .select('*')
          .eq('user_id', userId);

        if (users && users.length > 0) {
          // El usuario existe, muestra la información del usuario
          setUser(users[0]); // Considera el primer resultado si hay varios usuarios con el mismo ID
        } else {
          // El usuario no existe, podrías manejar esto de alguna manera (mostrar un mensaje, redirigir, etc.)
          console.log('Usuario no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [userId]); // Ahora depende del cambio en el parámetro de la URL

  return (
    <div>
      {user && (
        <div>
          {/* <p>{user.user_id}</p>
          <p>{user.email}</p>
          <p>{user.nameUser}</p>
          <img src={user.avatarUrl} alt={user} />
          */}

          <Card
            avatar={user.avatarUrl}
            email={user.email}
            username={user.nameUser}
            logout={'fdgj'}
            btnText2='ndas'
            />
            <Upload/>
          

        

        </div>


      )}



    </div>
  );
}


export default Perfil;

