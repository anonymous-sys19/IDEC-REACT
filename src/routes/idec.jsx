/* eslint-disable react/jsx-no-target-blank */
// import { useEffect } from 'react';
import AboutSection from '../partials/aboutSection';
import ServiceSection from '../partials/serviceSection';
import TeamSection from '../partials/teamSection';
import Portafolio from '../partials/portafolio';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
const Idec = () => {



  return (
    <>
      <div className="contHeaderFather">

        <div className="contHeader">
          <LazyLoadImage className='imgContainer' src="/SVG/logo-idec.svg" alt="" />

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
      <LazyLoadComponent>
        <ServiceSection />
      </LazyLoadComponent>

      <LazyLoadComponent>
        <Portafolio />
      </LazyLoadComponent>
      <LazyLoadComponent>
        <AboutSection />
      </LazyLoadComponent>
      <LazyLoadComponent>
        <TeamSection />
      </LazyLoadComponent>
    </>
  );
};

export default Idec;
