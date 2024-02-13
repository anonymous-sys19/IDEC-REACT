import '/public/css/logoNavMneu.css';
import 'animate.css'
function logoNavMenu() {


  return (
    <>

      <div className="divNav">
        <div>
          <img
            className="imglogoidecCola animate__animated animate__zoomInLeft"
            src="/images/logo-idec.png"

            alt="logo"
            loading='lazy'
          />
        </div>
        <div className="loading">
          <span className="listaSpanIDEC">I</span>
          <span className="listaSpanIDEC">D</span>
          <span className="listaSpanIDEC">E</span>
          <span className="listaSpanIDEC">C</span>
        </div>
      </div>
    </>
  )
}

export default logoNavMenu
