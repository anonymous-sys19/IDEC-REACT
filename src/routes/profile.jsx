/* eslint-disable react/prop-types */
import UseProfile from '../hooks/useProfile';
import { useEffect } from 'react';

export default function ProfileComponent() {
  const { loading, username, website, avatarUrl, downloadImage } = UseProfile();

  useEffect(() => {
    if (!loading && avatarUrl) {
      downloadImage(avatarUrl); // Llama a downloadImage cuando el avatarUrl está disponible
    }
  }, [loading, avatarUrl, downloadImage]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {avatarUrl && <img className='' src={avatarUrl} alt="Avatar" />} {/* Muestra la imagen si avatarUrl está disponible */}
      <h2>{username}</h2>
      <p>{website}</p>
    </div>
  );
}