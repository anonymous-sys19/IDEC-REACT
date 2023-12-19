import { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const ServiceSection = () => {
    useEffect(() => {
        // Agrega el script al DOM
        const script = document.createElement('script');
        script.src = 'https://dailyverses.net/get/random.js?language=nvi';
        script.async = true;
        script.defer = true;
        document.getElementById('dailyVersesRandom').appendChild(script);

        // Limpia el script al desmontar el componente
        return () => {
            document.getElementById('dailyVersesRandom').removeChild(script);
        };
    }, []);
    return (
        <section id="services">

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">
                            Services
                        </h2>
                        <h3 className="section-subheading text-muted">
                            <div id="dailyVersesRandom"> Loading ... </div>  {/* New RAndom Versicyculo  Cada vez que refresh the page*/}
                            <Helmet>
                                <script async defer src="https://dailyverses.net/get/random.js?language=nvi"></script>
                            </Helmet>
                        </h3>
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
        </section>
    )
}

export default ServiceSection;