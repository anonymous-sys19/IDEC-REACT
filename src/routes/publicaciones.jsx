/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { FaEllipsisV } from 'react-icons/fa';
import { AiTwotoneMessage } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { useState, useEffect } from 'react';
import TextoConNegritaAutomatica from '../components/NegritaAuto';

import { supabase } from './Auth/supabaseClient';

/* eslint-disable react/no-unknown-property */

export default function Publicaciones() {
    //Detect Nregita
    
    const [comment, setComment] = useState('');
    const [isCommentVisible, setCommentVisible] = useState(false);

    const handleCommentClick = () => {
        setCommentVisible(!isCommentVisible);
    };

    //COntrolo el input del COmentario
    const handleInputChange = (e) => {
        setComment(e.target.value)
    }
    //Press enter to sEND
    const hanldeEnterPress = (e) => {
        if (e.key === 'Enter') {
            alert(comment)
            setCommentVisible(false)
            setComment()
        }
    } //


    const fetchImages = async () => {
        try {
            // Obtén la lista de archivos en tu bucket
            const { data: fileData, error: fileError } = await supabase.storage.from('idec-public').list('images/');

            if (fileError) {
                throw fileError;
            }


            // Construye las URLs completas para cada imagen
            const images = await Promise.all(fileData.map(async (file) => {
                const encodedFileName = encodeURIComponent(file.name);
                const url = `idec-public/images/${encodedFileName}`;
                // const url = `/images/${encodeURIComponent(file.name)}`;

                try {

                    const { data: imageData, error: imageError } = await supabase
                        .from('idectableimages')
                        .select("user_id, description, created_at")
                        .eq('url', url)
                        .maybeSingle()

                    if (imageError) {
                        console.error('Error al obtener la información de la imagen:', imageError.message);
                        return null;
                    }
                    //
                    //


                    return {
                        name: file.name,
                        url: `https://janbrtgwtomzffqqcmfo.supabase.co/storage/v1/object/public/idec-public/images/${file.name}`,
                        uid: imageData?.user_id,
                        description: imageData?.description,
                        createdAt: imageData?.created_at,
                    };

                } catch (error) {
                    console.error('Error al procesar la imagen:', error.message);
                    return null;
                }


            }))
            // Filtra las imágenes nulas (aquellas con errores al obtener información desde la base de datos)
            const filteredImages = images.filter((image) => image !== null);

            // Actualiza el estado con la lista de imágenes
            setImageList(filteredImages);
        } catch (error) {
            console.error('Error al obtener la lista de imágenes:', error.message);
        }
    };

    fetchImages();
    const [imageList, setImageList] = useState([]);
   
   
    return (
        <>

            {imageList.map((image) => (
                <div className="Public container" key={image.name}>
                    <div className='public'>
                        <blockquote className="">
                            <span className="comment">
                                <div className="">
                                    <div className='dateIcons'>
                                        <div>
                                            <div className='ProfileItems'>
                                                <div>
                                                    {/* {image.uid && <img src={avatarUrl} className='PublicAvatar' alt={image.uid} />} */}
                                                    {image.uid && (
                                                    // Llamada a UseProfile para obtener el avatar del usuario
                                                        
                                                            <img src={image.avatar_url} className='PublicAvatar' alt={image.uid} />
                                                            )}
                                                      
                                                 
                                                </div>
                                                <div className='UserDate'>
                                                    <a href='/perfil'>{image.avatar_url}</a>
                                                    <li className="date">{image.createdAt}</li>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='treeePounts'>
                                            <span className='treeePount'> <FaEllipsisV /> </span>

                                        </div>

                                    </div>

                                </div>
                                <div className='PublicComment container'>
                                    <li className='commentPublic'>
                                        <TextoConNegritaAutomatica>
                                            {image.description}
                                        </TextoConNegritaAutomatica>
                                    </li>
                                </div>
                                {/* <hr size="1px" color="black" /> */}
                            </span>
                            <div className="container containerImg">
                                <img className='imgPublic' src={image.url} alt={image.name} />

                            </div>
                        </blockquote>
                        <hr size="2px" color="black" />
                        <div className='checks'>
                            <div className='like'>
                                <button onClick={() => {
                                    alert(true)
                                }}> <AiTwotoneLike /> Like</button>
                            </div>
                            <div className="comment">
                                <button onClick={handleCommentClick}> <AiTwotoneMessage /> Coment</button>
                            </div>
                            <div className="share">
                                <button onClick={() => {
                                    alert(true)
                                }}> <FaShare /> Compartir</button>
                            </div>
                        </div>
                        <hr size="2px" color="black" />
                        {isCommentVisible && (
                            <div className="comment-input-container">
                                <input
                                className='commentInput'
                                    type="text"
                                    placeholder="Escribe tu comentario..."
                                    value={comment}
                                    onChange={handleInputChange}
                                    onKeyPress={hanldeEnterPress}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}

        </>

    )



  
}
