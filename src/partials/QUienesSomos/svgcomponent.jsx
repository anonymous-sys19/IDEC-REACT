import { LazyLoadImage } from 'react-lazy-load-image-component';
import '/public/css/conex2030.css'
function SvgComponent() {
    return (
        <div>
            <div className="father-avatar-20-30" >
                <div className='container-avatar-20-30'>
                    <div className="avatar-conex">
                        <LazyLoadImage className='img-2030' src="/images/20_30.png" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default SvgComponent;
