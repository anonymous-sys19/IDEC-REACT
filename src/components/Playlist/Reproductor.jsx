/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import AudioPlayer from '@madzadev/audio-player';
import '@madzadev/audio-player/dist/index.css';
import { supabase } from '../../routes/Auth/supabaseClient';

const Reproductor = () => {
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const fetchedTracks = await fetchAudioTracks();
                setTracks(fetchedTracks);
            } catch (err) {
                setError('Error loading tracks.');
                console.error('Error loading tracks:', err);
            }
        };

        loadTracks();
    }, []);

    const fetchAudioTracks = async () => {
        try {
            const { data: audioTracks, error } = await supabase
                .storage
                .from('idec-public') // Nombre correcto del bucket
                .list('playlistMusic/'); // Carpeta dentro del bucket

            if (error) {
                console.error('Error fetching audio tracks:', error);
                throw error; // Esto lanzará un error que será capturado por el try/catch
            }

            console.log('Fetched files:', audioTracks);

            // Generar la lista de pistas
            const trackList = audioTracks.map(file => {
                const encodedFileName = encodeURIComponent(file.name);
                const url = `idec-public/playlistMusic/${encodedFileName}`;
                const { data: publicURL, error: audioError } = supabase.storage
                    .from('idec-public')
                    .getPublicUrl(url); // Asegúrate de que la ruta es correcta

                // Verifica si se obtuvo correctamente la publicURL
                if (!publicURL) {
                    console.error(`Error getting public URL for ${file.name}`);
                    return null; // Retorna null si no se pudo obtener la URL
                }

                console.log(`Generated URL for ${file.name}: ${url}`);

                return {
                    url: `https://janbrtgwtomzffqqcmfo.supabase.co/storage/v1/object/public/idec-public/playlistMusic/${file.name}`,
                    title: file.name,
                    tags: ['Adoration with Music'],
                };
            }).filter(Boolean); // Filtra cualquier valor null

            return trackList;
        } catch (error) {
            console.log(error);
            

        }
    };

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : tracks.length > 0 ? (
                <AudioPlayer
                    trackList={tracks}
                    autoplay={false}
                    autoPlayNextTrack={true}
                    onPlay={(track) => console.log(`Playing ${track.title}`)}
                    
                    onError={(error) => {
                        console.error('Audio player error:', error);
                        setError('An error occurred while trying to play the audio.');
                    }}
                />
            ) : (
                <p>Loading tracks...</p>
            )}
        </div>
        
    );
};

export default Reproductor;
