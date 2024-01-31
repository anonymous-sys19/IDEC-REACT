// import { FaArrowUp } from 'react-icons/fa';
import '/public/css/FlotingButton.css'

import { useEffect, useState } from 'react';
// import ScrollToTop from 'react-scroll-to-top';

import { FaArrowUp } from 'react-icons/fa';

const FloatingButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100);
        };

        // Agregar event listener al montar el componente
        window.addEventListener('scroll', handleScroll);

        // Limpiar event listener al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // La dependencia debe estar vacía para solo agregar el listener una vez

    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <button
            id="scrollToTopButton"
            className={isVisible ? 'visible' : ''}
            onClick={handleButtonClick}
        >
            <FaArrowUp />
        </button>
    );
};

export default FloatingButton;