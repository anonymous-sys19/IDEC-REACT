import '/public/css/historia.css'
import '/public/css/mision.css'
const MisionAndVision = () => {
  88
  return (
    <article>
        <div className="container title-ms text-center">
          <h2 className=''>Mision y Vision</h2>
        </div>
      <div className="container cont1">
        <div className="container borders">
          <div className="container">
            <h2 className='title-m-v'>Misión</h2>
            <p className="ms-cl">
              La Iglesia de Dios E.C. de Guatemala existe para perpetuar el evangelio completo de Jesucristo
              (Mateo 28:19-20) en el Espíritu y poder Pentecostés (Hechos 2:1-4,6,13-18), a través de: la comunión,
              la adoración, el testimonio, la proclamación, la enseñanza y el servicio.
            </p>
          </div>

          <div>
            <h2 className='title-m-v'>Visión</h2>
            <p className="ms-cl">
              Ser una Iglesia fundamentada en las Sagradas Escrituras, llena del Espíritu Santo, en constante crecimiento;
              que adora a Dios en espíritu y verdad; que tiene una profunda pasión por los no alcanzados, un compromiso con
              la evangelización, el discipulado, la plantación de iglesias y la Misión Global; que desarrolla integralmente a
              sus ministros y congregaciones; que sirve a los que sufren y produce un impacto transformador en la sociedad.
            </p>
            <hr />
          </div>
          {/* <div>

            <h2>Plan Estratégico - Conexión 20/30</h2>
            <h3>Misión</h3>
            <p className="ms-cl">
              La Iglesia de Dios E.C. de Guatemala existe para perpetuar el evangelio completo de Jesucristo
              (Mateo 28:19-20) en el Espíritu y poder Pentecostés (Hechos 2:1-4,6,13-18), a través de: la comunión,
              la adoración, el testimonio, la proclamación, la enseñanza y el servicio.
            </p>

            <h3>Visión</h3>
            <p className="ms-cl">
              Ser una Iglesia fundamentada en las Sagradas Escrituras, llena del Espíritu Santo, en constante crecimiento;
              que adora a Dios en espíritu y verdad; que tiene una profunda pasión por los no alcanzados, un compromiso con
              la evangelización, el discipulado, la plantación de iglesias y la Misión Global; que desarrolla integralmente a
              sus ministros y congregaciones; que sirve a los que sufren y produce un impacto transformador en la sociedad.
            </p>
          </div> */}
        </div>
      </div>
    </article>
  );
}

export default MisionAndVision;
