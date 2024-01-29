/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './card.css'
import { detectDominantColor } from 'dominated-color';

import { useState, useEffect } from 'react';
const Card = ({ email, username, avatar, logout, btnText2 }) => {
    const [dominantColor, setDominantColor] = useState(null);
    const img = new URL(avatar, import.meta.url).pathname;
    console.log(img);
    useEffect(() => {
        const fetchDominantColor = async () => {
            try {
                if (img) {
                    const color = await detectDominantColor(img, "rgb");
                    setDominantColor(color);
                    console.log(color);
                } else {
                    console.error('Image path is null');
                }
            } catch (error) {
                console.error('Error fetching dominant color:', error);
            }
        };

        fetchDominantColor();
    }, [img]);
    console.log(dominantColor);

    return (
        <div className="card">
            <div className="card__img" style={{ background: dominantColor }}>
                <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                    <image href={avatar} width="100%" height="100%" />
                </svg>
            </div>
            <div className="card__avatar">
                <svg style={{ borderRadius: '50px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                    <image href={avatar} width="100%" height="100%" />
                </svg>
            </div>
            <div className="card__title">{username}</div>
            <div className="card__subtitle">{email}</div>
            <div className="card__wrapper">
                <a className="card__btn" href={logout} />
                <button className="card__btn card__btn-solid">{btnText2}</button>
            </div>
        </div>
    );
};

export default Card;
