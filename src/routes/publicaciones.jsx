/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from 'react';
import { supabase } from './Auth/supabaseClient';
import CommentInput from '../components/Publications/CommentInput';
const Publicaciones = () => {
    const fetchImages = async () => {
        try {
            const { data: fileData, error: fileError } = await supabase.storage.from('idec-public').list('images/');
            if (fileError) {
                throw fileError;
            }
            const images = await Promise.all(fileData.map(async (file) => {
                const encodedFileName = encodeURIComponent(file.name);
                const url = `idec-public/images/${encodedFileName}`;
                try {
                    const { data: imageData, error: imageError } = await supabase
                        .from('idectableimages')
                        .select()
                        .eq('url', url)
                        .maybeSingle();
                    return {
                        name: file.name,
                        url: `https://janbrtgwtomzffqqcmfo.supabase.co/storage/v1/object/public/idec-public/images/${file.name}`,
                        uid: imageData.user_id,
                        description: imageData.description,
                        createdAt: imageData.created_at,
                        avatar_url: imageData.avatarUrl,
                        name_Username: imageData.nameUser,
                    };
                } catch (error) {
                    console.error('Error al procesar la imagen:', error.message);
                    return null;
                }
            }));
            const filteredImages = images.filter((image) => image !== null);
            setImageList(filteredImages);
        } catch (error) {
            console.error('Error al obtener la lista de imágenes:', error.message);
        }
    };
    useEffect(() => {
        fetchImages()
    }, []);
    const [imageList, setImageList] = useState([]);
    return (
        <>
            <article>
                {imageList.map((image) =>
                    <div className="Public container" key={image.name}>
                        {/* Here aqui */}
                        < CommentInput 
                        uid={image.uid}
                        name_Username={image.name_Username}
                        createdAt={image.createdAt}
                        description={image.description}
                        url={image.url}
                        avatar_url={image.avatar_url}
                        liked={image.liked}
                        />
                    </div>
                )}
            </article>
        </>
    )
}
export default Publicaciones;