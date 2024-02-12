/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function SocialMedia({ facebook, instagran, whasapp }) {
    return (
        <div className='team-social'>
            
            <a href={facebook} className="social-fb">
                <FontAwesomeIcon icon={['fab', 'facebook']} />
            </a>
            <a href={instagran} className="social-in">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
            </a>
            <a href={whasapp} className="social-li">
                <FontAwesomeIcon icon={['fab', 'whatsapp']} />
            </a>
        </div>
    )
}

export default SocialMedia