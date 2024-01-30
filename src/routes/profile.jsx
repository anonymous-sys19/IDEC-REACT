/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// UserList.js
import Card from '../components/CardAvatar';
import { useEffect, useState } from 'react';
import { supabase } from '../routes/Auth/supabaseClient'

import { useParams } from 'react-router-dom';  // Importa 'useParams' de react-router-dom
import Upload from './ImageUploader';
// FIXME:  importo el context de session
import { UserAuth } from './Auth/AuthContext';

function Perfil() {
  const { user, session, signout,  } = UserAuth();
  // Verifica si hay una sesión
  const isAuthenticated = user.email;

  const { userId } = useParams();  // FIXME: Accede al valor específico 'userId' del objeto devuelto por 'useParams'
  const [ nUser, setUser] = useState(null);
 

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
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [userId]); 
  //  FIXME: Ahora depende del cambio en el parámetro de la URL

  return (
    <div>
      {nUser && (
        <div>

          <Card
            avatar={nUser.avatarUrl}
            email={nUser.email}
            username={nUser.nameUser}
            logout={'fdgj'}
            btnText2='ndas'
            />
            { isAuthenticated && nUser.email ? (

              <Upload/>
            ): ""}
          

        

        </div>


      )}



    </div>
  );
}


export default Perfil;

