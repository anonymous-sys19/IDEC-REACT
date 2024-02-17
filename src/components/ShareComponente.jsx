/* eslint-disable react/prop-types */
import { FaShare } from 'react-icons/fa';

const ShareButton = ({ url, title, description}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
            title,
            text: description,
            url,
        });
        console.log('Contenido compartido con éxito');
      } catch (error) {
        console.error('Error al compartir:', error.message);
      }
    } else {
      alert('Web Share API no está disponible en este navegador.');
    }
  };

  return (
    
      <button onClick={handleShare}>
        <FaShare /> Compartir
      </button>
    
  );
};

export default ShareButton;
