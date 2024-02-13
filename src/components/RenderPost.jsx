/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TextoConNegritaAutomatica from '../components/NegritaAuto';
import { FaUser, FaEllipsisV, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiTwotoneMessage, AiTwotoneLike } from 'react-icons/ai';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
const RenderPost = ({ image, nUser, scrollPosition }) => {
    return (
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


                                                <LazyLoadImage src={image.avatar_url} className='PublicAvatar' scrollPosition={scrollPosition} />
                                            ) : (

                                                <FaUser className='PublicAvatar' />
                                            )
                                            }


                                        </div>
                                        <div className='UserDate'>
                                            {/* <a href={`perfil/s/${image.uid}`}>{image.name_Username}</a> */}
                                            <Link to={`/perfil/s/${image.uid}`}>{image.name_Username}</Link>
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
                        <LazyLoadImage className='imgPublic' src={image.url} alt={image.url} scrollPosition={scrollPosition} />

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
                        <button onClick={'handleCommentClick'}> <AiTwotoneMessage /> Coment</button>
                    </div>
                    <div className="share">
                        <button onClick={() => {
                            alert(true)
                        }}> <FaShare /> Compartir</button>
                    </div>
                </div>
                <hr size="2px" color="black" />
                {'isCommentVisible' && (
                    <div className="comment-input-container">
                        <input
                            className='commentInput'
                            type="text"
                            placeholder="Escribe tu comentario..."
                            value={'comment'}
                            onChange={'handleInputChange'}
                            onKeyPress={'hanldeEnterPress'}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default trackWindowScroll(RenderPost)