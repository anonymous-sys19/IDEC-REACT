import  { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const ServiceSection = () => {
    const dailyVersesWrapperRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://dailyverses.net/get/verse.js?language=niv');
            const verseScript = await response.text();

            // Inserta el script en el div después de obtenerlo
            const scriptElement = document.createElement('script');
            scriptElement.text = verseScript;
            dailyVersesWrapperRef.current.appendChild(scriptElement);

            // Después de insertar el script, espera un momento antes de generar la imagen
            setTimeout(generateImage, 1000);
        };

        const generateImage = async () => {
            const element = dailyVersesWrapperRef.current;
            const canvas = await html2canvas(element);
            const imageDataURL = canvas.toDataURL('image/png');

            // Aquí puedes hacer lo que quieras con la imagen, por ejemplo, mostrarla en la consola.
            console.log(imageDataURL);
        };

        // Llamada a la función para obtener el script y luego generar la imagen
        fetchData();
    }, []);

    return (
        <div id="dailyVersesWrapper" ref={dailyVersesWrapperRef}>
            {/* Contenido del versículo */}
        </div>
    );
};

export default ServiceSection;

