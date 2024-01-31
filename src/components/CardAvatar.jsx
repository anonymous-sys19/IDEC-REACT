/* eslint-disable react/prop-types */
import '/public/css/card.css'
import { BsThreeDots } from "react-icons/bs";

// import { useState, useEffect } from 'react';/
const Card = ({ email, username, avatar, publicaciones, fotos, videos, treePountInformation }) => {


    return (
        <div className="container">
            <div className="card">
                <div className="card__img" >
                    <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                        <image href={"https://wallpapercave.com/wp/wp12509690.jpg"} />
                    </svg>
                </div>
                <div className='Cont-card-icons-more'>
                    <div className="card__avatar">
                        <svg style={{ borderRadius: '100px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                            <image href={avatar} width="100%" height="100%" />
                        </svg>
                    </div>
                    <div>
                        <div className='cont-perfil flex justify-content-between align-items-end'>
                            <div>
                                <div className="card__title">{username}</div>
                                <div className="card__subtitle">{email}</div>
                            </div>
                            <div className='text-alig-center'>
                                <a href="#">Editar Perfil</a>
                            </div>
                        </div>
                    </div>
                    <div className="card__wrapper hr">
                        {/* <hr className='hr' /> */}
                        <div className="flex align-items-center">
                            <div className="container flex">
                                <div>
                                    <button className="btn " >{publicaciones}</button>
                                </div>
                                <div>
                                    <button className="btn ">{fotos}</button>
                                </div>
                                <div >
                                    <button className='btn' >{videos}</button>
                                </div>
                            </div>
                            <div >
                                <a className='btn' href={treePountInformation}> {<BsThreeDots />}</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
