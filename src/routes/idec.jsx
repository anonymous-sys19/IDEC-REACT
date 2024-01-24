/* eslint-disable react/jsx-no-target-blank */
// import { useEffect } from 'react';
import AboutSection from '../partials/aboutSection';
import ServiceSection from '../partials/serviceSection';
import TeamSection from '../partials/teamSection';
// import { Helmet } from 'react-helmet';
import Portafolio from '../partials/portafolio';
const Idec = () => {



  return (
    <>
      <div className="contHeaderFather">
       
        <div className="contHeader">
          <img className='imgContainer' src="/SVG/logo-idec.svg" alt="" />
        
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
