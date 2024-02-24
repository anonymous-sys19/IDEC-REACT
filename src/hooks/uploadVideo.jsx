import { useState } from 'react';
import { supabase } from './supabase'; // Importa tu instancia de supabase si no lo has hecho

export const useVideoUploader = () => {
    const [video, setVideo] = useState(null);

    const handleVideoChange = (event) => {
        setVideo(event.target.files[0]);
    };
    const handleVideoUpload = async () => {
        if (video) {
            const { data, error } = await supabase.storage.from('videos').upload(video.name, video);
            if (error) {
                console.error(error);
            } else {
                console.log(data);
            }
        }
    };
    return {
        video,
        handleVideoChange,
        handleVideoUpload,
    };
};

