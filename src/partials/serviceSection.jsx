/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';
import { MdDownloadForOffline } from "react-icons/md";
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
        const jsonImagePath = "/json/imagespathstoDownload.json"; // Reemplaza con la ruta correcta de tu JSON
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
        // return () => {
        //     document.getElementById('dailyVersesWrapper').removeChild(script);
        // };
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
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontWeight: 700
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
                                    background: '#ffffff',
                                    color: '#1cb389',
                                    border: 'none',
                                    borderRadius: '100px',
                                    fontSize: '2.3rem',
                                    padding: 0,
                                    display: 'flex',
                                    float: 'right'
                                } 
                            } onClick={captureAndDownloadImage}> < MdDownloadForOffline  /> </button>
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
                            Su origen
                        </h4>
                        <p className="text-muted">
                            Su origen como Iglesia en el en estricto sentido de la palabra.Este hecho sin duda alguna ocurrió el día del Pentecostés según se relata en la Biblia <b> Hechos capitulo 2</b>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="glyphicon glyphicon-heart"></i>
                        </span>
                        <h4 className="service-heading">
                            La Cruz
                        </h4>
                        <p className="text-muted">
                            Representa que como iglesia creemos en jesucristo que fué crusificado en una cruz y resucitó al tercer dia de entre los miertos.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="glyphicon glyphicon-tint"></i>
                        </span>
                        <h4 className="service-heading">
                            La llama
                        </h4>
                        <p className="text-muted">
                            Representa que como iglesia creemos en el Bautismo del Espiritu Santo, que empodera a la iglesia para cumplir con la gran comisión
                        </p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="glyphicon glyphicon-tint"></i>
                        </span>
                        <h4 className="service-heading">
                            ¿Sabias que.?
                        </h4>
                        <p className="text-muted">
                            Toda la igleisa de Dios debe usar este Logo según nuestro Estatuto
                        </p>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default ServiceSection;