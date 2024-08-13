/* eslint-disable no-undef */
import { useState } from 'react';
import { supabase } from '../../routes/Auth/supabaseClient';

const SubirMusica = () => {
    const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
    const [error, setError] = useState(null); // Estado para manejar errores
    const [loading, setLoading] = useState(false); // Estado para mostrar carga

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Almacena el archivo seleccionado
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Por favor, selecciona un archivo para subir.');
            return;
        }

        setLoading(true);
        setError(null); // Restablecer el error antes de comenzar la carga

        try {
            const { data, error } = await supabase
                .storage
                .from('idec-public')
                .upload(`playlistMusic/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false, // Cambia a true si quieres sobrescribir archivos existentes
                });

            if (error) {
                throw error; // Lanzar error si hay un problema al subir
            }

            console.log('Archivo subido:', data);
            alert('Archivo subido con éxito!');

            // Restablecer el estado después de la carga
            setFile(null);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            setError('Error al subir el archivo.');
        } finally {
            setLoading(false); // Finalizar la carga
        }
    };

    return (
        <div className='container flex'>

            <div>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <button onClick={handleUpload} disabled={loading} className='btn btn-success'>
                    {loading ? 'Subiendo...' : 'Subir Música'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SubirMusica;
