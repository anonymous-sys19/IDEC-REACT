import { useEffect, useState } from 'react';
import { UserAuth } from './Auth/AuthContext';

const UserProfile = () => {
  const { user } = UserAuth(); // Obtener el usuario del contexto de autenticación
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      // Aquí puedes hacer cualquier solicitud adicional para obtener información del perfil
      // Puedes usar Supabase o cualquier otro medio para obtener datos adicionales del usuario
      // En este ejemplo, simplemente configuramos la información del perfil basándonos en los datos del usuario
      setProfileData({
        name: user.full_name,
        email: user.email,
        avatar: user.avatar_url,
      });
    }
  }, [user]); // Se ejecutará cada vez que el usuario cambie

  return (
    <div>
      {profileData ? (
        <div>
          <img src={profileData.avatar} alt="Avatar" />
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        <p>No se ha cargado el perfil</p>
      )}
    </div>
  );
};

export default UserProfile;
