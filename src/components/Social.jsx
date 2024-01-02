import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function SocialMedia() {
    return (
        <div className='team-social'>
            <a href="#" className="social-tw">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
            <a href="#" className="social-fb">
                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            </a>
            <a href="#" className="social-li">
                <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
            </a>
            <a href="#" className="social-in">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
            </a>
            <a href="#" className="social-yt">
                <FontAwesomeIcon icon={['fab', 'youtube']} />
            </a>
        </div>
    )
}

export default SocialMedia