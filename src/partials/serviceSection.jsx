/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';

const ServiceSection = () => {
    useEffect(() => {
        // Agrega el script al DOM
        const script = document.createElement('script');
        script.src = 'https://dailyverses.net/get/verse.js?language=nvi';
        script.async = true;
        script.defer = true;
        document.getElementById('dailyVersesWrapper').appendChild(script);

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
    return (
        <section id="services">

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="sec-daily-father section-subheading text-muted">
                            <section className='sec-daily' ref={dailyVersesRef}>
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