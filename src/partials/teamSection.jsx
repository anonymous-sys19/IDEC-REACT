// index.js o index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialMedia from '../components/Social';
import '/public/css/TeamSection.css'
const TeamSection = () => {

    return (

        <div className="container">
            <div className="section-title">
                <h1>Equipo de Lideres</h1>
            </div>

            <div className="row">


                <div className="column">
                    <div className="team">
                        <div className="team-img">
                            <img className='teamImg' src="/images/logo-idec.png" alt="Team Image" />
                        </div>
                        <div className="team-content">
                            <h2>Steven</h2>
                            <h3>CEO & Founder</h3>
                            <p>Some text goes here that describes about team members</p>
                            <h4>abc@gmail.com</h4>
                        </div>
                        <SocialMedia/>
                    </div>
                </div>

                <div className="column">
                    <div className="team">
                        <div className="team-img">
                            <img className='teamImg' src="/images/logo-idec.png" alt="Team Image" />
                        </div>
                        <div className="team-content">
                            <h2>Mayra</h2>
                            <h3>Art Director</h3>
                            <p>Some text goes here that describes about team members</p>
                            <h4>abc@gmail.com</h4>
                        </div>
                        <SocialMedia/>
                    </div>
                </div>

                <div className="column">
                    <div className="team">
                        <div className="team-img">
                            <img className='teamImg' src="/images/logo-idec.png" alt="Team Image" />
                        </div>
                        <div className="team-content">
                            <h2>John</h2>
                            <h3>Developer</h3>
                            <p>Some text goes here that describes about team members</p>
                            <h4>abc@gmail.com</h4>
                        </div>
                        <SocialMedia/>
                    </div>
                </div>

                <div className="column">
                    <div className="team">
                        <div className="team-img">
                            <img className='teamImg' src="/images/logo-idec.png" alt="Team Image" />
                        </div>
                        <div className="team-content">
                            <h2>Jennifer</h2>
                            <h3>Designer</h3>
                            <p>Some text goes here that describes about team members</p>
                            <h4>abc@gmail.com</h4>
                        </div>
                        <SocialMedia />
                    </div>
                </div>

            </div>

        </div>

    )
}

export default TeamSection;