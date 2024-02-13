/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';

const ServiceSection = () => {

    const [currentVerseText, setCurrentVerseText] = useState('');
    const [currentImagePath, setCurrentImagePath] = useState('');


    useEffect(() => {
        // Agrega el script al DOM
        const script = document.createElement('script');
        script.src = 'https://dailyverses.net/get/verse.js?language=nvi';
        script.async = true;
        script.defer = true;
        document.getElementById('dailyVersesWrapper').appendChild(script);


        // Obtén las rutas de las imágenes desde tu JSON (suponiendo que es un objeto con una propiedad "imagePaths")
        const jsonImagePath = "/public/json/imagespathstoDownload.json"; // Reemplaza con la ruta correcta de tu JSON
        fetch(jsonImagePath)
            .then(response => response.json())
            .then(data => {
                const imagePaths = data.imagePaths || [];

                // Cambiar la imagen de fondo de forma aleatoria
                const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
                setCurrentImagePath(randomImagePath);
            })
            .catch(error => console.error('Error fetching image paths:', error));
    


        // Limpia el script al desmontar el componente
        
        return () => {
        document.getElementById('dailyVersesWrapper').removeChild(script);
    };
}, []);

const dailyVersesRef = useRef(null);

const captureAndDownloadImage = async () => {
    const canvas = await html2canvas(dailyVersesRef.current);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'dailyVerses.png';
    link.click();
};

const dailyVerseStyle = {
    backgroundImage: `url(${currentImagePath})`,
    // Aquí puedes agregar otros estilos necesarios
};
return (
    <section id="services">

        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="sec-daily-father section-subheading text-muted">
                        <section className='sec-daily' ref={dailyVersesRef} style={dailyVerseStyle}>
                            <div className="dailyVerse" id="dailyVersesWrapper">
                                {/* Contenido del div */}
                            </div>
                        </section>
                        <button style={
                            {
                                'background': 'aquamarine',
                                'color': 'black',
                                'border': 'none',

                            }
                        } onClick={captureAndDownloadImage}>Capturar imagen</button>
                        <Helmet>
                            <script async defer src="https://dailyverses.net/get/verse.js?language=nvi"></script>
                        </Helmet>
                    </div>

                    {/* <iframe width="500px" scrolling="no" height="400px" frameborder="0" src="https://www.bibliatodo.com/es/online/versiculo-del-dia"></iframe> */}

                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="glyphicon glyphicon-tree-conifer"></i>
                    </span>
                    <h4 className="service-heading">
                        Here is a pokok
                    </h4>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.
                    </p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="glyphicon glyphicon-heart"></i>
                    </span>
                    <h4 className="service-heading">
                        Heres a heart
                    </h4>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.
                    </p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="glyphicon glyphicon-tint"></i>
                    </span>
                    <h4 className="service-heading">
                        Waterfall maybe?
                    </h4>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.
                    </p>
                </div>
            </div>
        </div>
    </section >
)
}

export default ServiceSection;