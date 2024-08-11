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
import { LuSendHorizonal } from "react-icons/lu";



// Is autenticated
import { UserAuth } from "../../routes/Auth/AuthContext";


const formatLikes = (likes) => {
    if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1).replace('.', ',') + 'M';
    } else if (likes >= 1000) {
        return (likes / 1000).toFixed(1).replace('.', ',') + 'k';
    } else {
        return likes.toString();
    }
}; //< liked ? liked : liked

const generateRandomComments = () => {
    const comments = [
        "Great post! completely agree with you Well written! completely agree with you",
        "I completely agree with you. Well written! completely agree with you",
        "Thanks for sharing! completely agree with you",
        "Interesting perspective. Well written! completely agree with you",
        "Well written! completely agree with you",
        "I learned something new today completely agree with you."
    ];

    return comments[Math.floor(Math.random() * comments.length)];
};
// 
const CommentInput = ({ liked, scrollPosition, uid, name_Username, createdAt, description, url, avatar_url }) => {
    liked = Math.floor(Math.random() * 1200000);
    const { user } = UserAuth();
    const isAuthenticated = !!user


    const [comment, setComment] = useState('');
    const [isCommentVisible, setCommentVisible] = useState(false);


    // Obtener un comentario aleatorio
    const randomComment = generateRandomComments();



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

                    </span>
                    <div className="container containerImg">
                        {/* <img   /> */}
                        <LazyLoadImage className='imgPublic' src={url} alt={url} scrollPosition={scrollPosition} />

                    </div>
                    <div className="d-flex justify-content-around">
                        <span className="mx-4"> {formatLikes(liked)} Likes</span>
                        <span className="mx-4" > 2 comentarios</span>
                        <span className="mx-4">5 veces compartido</span>
                    </div>
                </blockquote>
                <hr size="2px" color="black" />
                <div className='checks'>
                    <div className='like'>
                        <button onClick={""}>
                            {isAuthenticated ? (
                                <span style={{ color: liked ? 'blue' : 'black' }}>
                                    <AiTwotoneLike />

                                    <>  Me gusta</>

                                </span>
                            ) : (
                                <span>Like</span>
                            )}
                        </button>
                    </div>
                    <div className="comment">
                        <button onClick={handleCommentClick} type="button" > <AiTwotoneMessage /> Comentario</button>
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
                    <div>
                        <div className="comment-input-container">
                            <div className="Content-Comment">
                                <input
                                    className='commentInput'
                                    type="text"
                                    placeholder="Escribe tu comentario..."
                                    value={comment}
                                    onChange={handleInputChange}
                                    onKeyPress={hanldeEnterPress}
                                />
                                <button type="submit"> <LuSendHorizonal /></button>
                            </div>

                            <hr size='2px' color="black" />
                            {/* Coments Part */}
                            <div className='ProfileItems commentBlubleAll'>
                                <div>

                                    <div className='UserDate'>
                                        <LazyLoadImage src={avatar_url} style={{ width: '40px', borderRadius: "100px", padding: '0 5px 0 0' }} scrollPosition={scrollPosition} />
                                        <Link to={`/perfil/s/${uid}`}>  {name_Username}</Link>
                                        <span style={{ width: '5px', color: '#9e9e9e' }} className="date">{' 12 junio 2024'}</span>
                                    </div>





                                </div>

                                {/* New comment */}
                                <div className="BubleOfComment">
                                    <div className="container commentsBuble">
                                        <span className="grey-700">{randomComment}</span>

                                    </div>
                                    <div className="ItemsComents">
                                        <div className="ItemsCommentsReaction">
                                            <div>
                                                <Link>Me gusta</Link>
                                            </div>
                                            <div>
                                                <Link> Responder</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                )}

            </div>

        </>

    )
}

export default trackWindowScroll(CommentInput)