/* eslint-disable react/jsx-no-target-blank */
// import { useEffect } from 'react';
import AboutSection from '../partials/aboutSection';
import ServiceSection from '../partials/serviceSection';
import TeamSection from '../partials/teamSection';
// import { Helmet } from 'react-helmet';
import Portafolio from '../partials/portafolio';
const Idec = () => {

  // useEffect(() => {
  //   // Agrega el script al DOM
  //   const script = document.createElement('script');
  //   script.src = 'https://dailyverses.net/get/verse.js?language=nvi';
  //   script.async = true;
  //   script.defer = true;
  //   document.getElementById('dailyVersesWrapper').appendChild(script);

  //   // Limpia el script al desmontar el componente
  //   return () => {
  //     document.getElementById('dailyVersesWrapper').removeChild(script);
  //   };
  // }, []);


  return (
    <>
      <div className="contHeaderFather">
        {/* <Helmet>
          <script async defer src="https://dailyverses.net/get/verse.js?language=nvi"></script>
        </Helmet> */}
        <div className="contHeader">
          <img className='imgContainer' src="/images/logo-idec.png" alt="" />
          {/* <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">
                Versículo del día
              </div>
              <div className="intro-heading" id="dailyVersesWrapper">

              </div>
              <a href="#services" className="page-scroll btn btn-xl bg-yellow">
                Scroll
              </a>
            </div>
          </div> */}
          <div className='container'>
            <div>
              <p className='idec intro-text'>
                Iglesia de Dios
              </p>
            </div>
            <div>
              <span className='idecCompleto'>Evangelio Completo</span>
            </div>
            <div>
              <span className='idecCompleto'>DE FINCA DOS</span>
            </div>

          </div>

        </div >

      </div >
      <ServiceSection />
      <Portafolio />
      <AboutSection />
      <TeamSection />
    </>
  );
};

export default Idec;
