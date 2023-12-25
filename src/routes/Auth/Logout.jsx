import { useHistory } from 'react-router-dom';
import { supabase } from './supabaseClient';
const Logout = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      history.push('/register'); // Redirige a la página de registro después del logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Llama a handleLogout cuando el componente se renderiza
  handleLogout();

  // Puedes devolver null o algún otro componente si es necesario
  return null;
};

export default Logout;
