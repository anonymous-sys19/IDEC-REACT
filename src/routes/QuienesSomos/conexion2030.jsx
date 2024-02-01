import ConexText from "../../partials/QUienesSomos/conectText"
import SvgComponent from "../../partials/QUienesSomos/svgcomponent"
function Conexion2030() {
    return (
        <article className="" style={{ 'background': "url('/public/images/bg-tel-white.jpg')", }}>
            <div className="father-2030" style={{ background: '#d9def2ac' }}>
                <div className="children-20-30">
                    <SvgComponent />
                    <ConexText />
                </div>
            </div>
        </article>
    )
}

export default Conexion2030