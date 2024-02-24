/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ShareButton from '../ShareComponente';
import TextoConNegritaAutomatica from '../NegritaAuto';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';
import { AiTwotoneMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';


import { supabase } from "../../routes/Auth/supabaseClient";

// Is autenticated
import { UserAuth } from "../../routes/Auth/AuthContext";
// import { image } from "html2canvas/dist/types/css/types/image";

const CommentInput = ({ liked, scrollPosition, uid, name_Username, createdAt, description, url, avatar_url }) => {

    const { user } = UserAuth();
    const isAuthenticated = !!user


    const [comment, setComment] = useState('');
    const [isCommentVisible, setCommentVisible] = useState(false);



    // Likes
    const [like, setLike] = useState(liked);

    const handleLike = async () => {
        // Actualizar el estado local
        setLike(like + 1);

        // Enviar la actualización a la base de datos
        try {
            const { data: imageData, error: imageError } = await supabase
                .from('idectableimages')
                .upsert([{ liked: like + 1 }],
                    { onConflict: ['url'] }
                )


            if (imageError) {
                console.error('Error al actualizar los likes:', imageError.message);
            }
        } catch (error) {
            console.error('Error al actualizar los likes:', error.message);
        }
    };

    // End likes


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

    return (
        <>
            <div className='public'>
                <blockquote className="">
                    <span className="comment">
                        <div className="">
                            <div className='dateIcons'>
                                <div>
                                    <div className='ProfileItems'>
                                        <div>
                                            {avatar_url ? (


                                                <LazyLoadImage src={avatar_url} className='PublicAvatar' scrollPosition={scrollPosition} />
                                            ) : (

                                                <FaUser className='PublicAvatar' />
                                            )
                                            }


                                        </div>
                                        <div className='UserDate'>
                                            {/* <a href={`perfil/s/${image.uid}`}>{image.name_Username}</a> */}
                                            <Link to={`/perfil/s/${uid}`}>{name_Username}</Link>
                                            <li className="date">{new Date(createdAt).toUTCString().replace('GMT', '')}</li>
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
                                    {description}
                                </TextoConNegritaAutomatica>
                            </li>
                        </div>
                        {/* <hr size="1px" color="black" /> */}
                    </span>
                    <div className="container containerImg">
                        {/* <img   /> */}
                        <LazyLoadImage className='imgPublic' src={url} alt={url} scrollPosition={scrollPosition} />

                    </div>
                </blockquote>
                <hr size="2px" color="black" />
                <div className='checks'>
                    <div className='like'>
                        <button onClick={handleLike}>
                            {isAuthenticated ? (
                                <span style={{ color: liked ? 'blue' : 'black' }}>
                                    <AiTwotoneLike />

                                    <>{liked} Likes</>

                                </span>
                            ) : (
                                <>Like</>
                            )}
                        </button>
                    </div>
                    <div className="comment">
                        <button onClick={handleCommentClick}> <AiTwotoneMessage /> Coment</button>
                    </div>
                    <div className="share">
                        {/*  */}
                        <ShareButton title={`*${name_Username}*`}
                            description={description}
                            url={URL} />
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

        </>

    )
}

export default trackWindowScroll(CommentInput)