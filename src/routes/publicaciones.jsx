/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { FaEllipsisV } from 'react-icons/fa';
import { AiTwotoneMessage } from "react-icons/ai";
import { FaShare, FaUser } from "react-icons/fa6";
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
    // console.log(imageList);

    return (
        <>
            <article>

                {imageList.map((image) =>
                    <div className="Public container" key={image.name}>
                        <div className='public'>
                            <blockquote className="">
                                <span className="comment">
                                    <div className="">
                                        <div className='dateIcons'>
                                            <div>
                                                <div className='ProfileItems'>
                                                    <div>
                                                        {image.avatar_url ? (


                                                            <img src={image.avatar_url} className='PublicAvatar' />
                                                        ) : (

                                                            <FaUser className='PublicAvatar' />
                                                        )
                                                        }


                                                    </div>
                                                    <div className='UserDate'>
                                                        <a href='/perfil'>{image.name_Username}</a>
                                                        <li className="date">{new Date(image.createdAt).toUTCString().replace('GMT', '')}</li>
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
                                    <img className='imgPublic' src={image.url} alt={image.url} />

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
                )}

            </article>
        </>

    )




}
