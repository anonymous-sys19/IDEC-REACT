import { useState, useEffect } from 'react';
import { supabase } from './Auth/supabaseClient';
import AudioPlayer from '@madzadev/audio-player';
import '@madzadev/audio-player/dist/index.css';

const Audios = () => {
    const [audioList, setAudioList] = useState([]);

    const fetchAudios = async () => {
        try {
            const { data: fileData, error: fileError } = await supabase.storage.from('idec-public').list('playlistMusic/');
            if (fileError) {
                throw fileError;
            }

            const audios = await Promise.all(fileData.map(async (file) => {
                const encodedFileName = encodeURIComponent(file.name);
                const url = `idec-public/playlistMusic/${encodedFileName}`;
                try {
                    const { data: audioData, error: audioError } = await supabase
                        .from('idectableaudios') // Cambia esto según tu tabla de audios
                        .select()
                        .eq('url', url)
                        .maybeSingle();

                    return {
                        name: file.name,
                        url: `https://janbrtgwtomzffqqcmfo.supabase.co/storage/v1/object/public/idec-public/playlistMusic/${file.name}`,
                        uid: audioData.user_id,
                        description: audioData.description,
                        createdAt: audioData.created_at,
                        avatar_url: audioData.avatarUrl,
                        name_Username: audioData.nameUser,
                    };
                } catch (error) {
                    console.error('Error al procesar el audio:', error.message);
                    return null;
                }
            }));

            const filteredAudios = audios.filter((audio) => audio !== null);
            setAudioList(filteredAudios);
        } catch (error) {
            console.error('Error al obtener la lista de audios:', error.message);
        }
    };

    useEffect(() => {
        fetchAudios();
    }, []);

    return (
        <>
            <article>
                {audioList.map((audio) => (
                    <div className="Public container" key={audio.name}>
                        <h3>{audio.name}</h3>
                        <AudioPlayer
                            src={audio.url}
                            autoplay={false}
                            onPlay={() => console.log(`Playing ${audio.name}`)}
                            onError={(error) => {
                                console.error('Audio player error:', error);
                            }}
                        />
                        {/* Aquí puedes añadir más detalles del audio si es necesario */}
                        <p>{audio.description}</p>
                        <p>{new Date(audio.createdAt).toLocaleDateString()}</p>
                        <img src={audio.avatar_url} alt={audio.name_Username} />
                        <p>{audio.name_Username}</p>
                    </div>
                ))}
            </article>
        </>
    );
};

export default Audios;
