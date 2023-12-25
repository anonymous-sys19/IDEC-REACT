import { format, parseISO } from 'date-fns';
import { FaEllipsisV } from 'react-icons/fa';
import { AiTwotoneMessage } from "react-icons/ai";
import { FaShare } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { useState } from 'react';
/* eslint-disable react/no-unknown-property */
const Publicaciones = () => {
    const fechaISO = '2023-12-13T05:26:00Z';
    const fechaFormateada = format(parseISO(fechaISO), "dd 'de' MMMM 'a las' HH:mm");

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
    }

    return (
        <div className="Public" >
            <div className='public'>
                <blockquote className="">
                    <span className="comment">
                        <div className="">
                            <div className='dateIcons'>
                                <div>
                                    <div className='ProfileItems'>
                                        <div>
                                            <img className='PublicAvatar' src="/public/images/IDEC.jpg" alt="" />
                                        </div>
                                        <div className='UserDate'>
                                            <a href='/perfil'>Greyvin Mayorga</a>
                                            <li className="date">{fechaFormateada}</li>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className='treeePount'> <FaEllipsisV /> </span>

                                </div>

                            </div>

                        </div>
                        <div className='PublicComment container'>
                            <li className='commentPublic'>Comentario del dia de salida..</li>
                        </div>
                        <hr size="1px" color="black" />
                    </span>
                    <div className="container">
                        <img className='imgPublic' src="./public/images/principal.jpg" alt="" />
                        
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

    )
}




export default Publicaciones;