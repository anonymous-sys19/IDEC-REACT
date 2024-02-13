import { LazyLoadImage } from "react-lazy-load-image-component";

function Logo() {

  return (
    <>
      <div className="contLog">
        <div >
          <LazyLoadImage
            className="logoidecCola animate__animated animate__zoomInLeft"
            src="/SVG/logo-idec.svg"
            width="100px"
            alt="logo"
            
          />
        </div>
        <div className="loading">
          <span className="listSpanIDEC">I</span>
          <span className="listSpanIDEC">D</span>
          <span className="listSpanIDEC">E</span>
          <span className="listSpanIDEC">C</span>
        </div>
      </div>
    </>
  );
}

export default Logo;
