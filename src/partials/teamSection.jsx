import 'bootstrap/dist/css/bootstrap.min.css';
import SocialMedia from '../components/Social';
import '/public/css/TeamSection.css'
import { useState, useEffect } from 'react';
const TeamSection = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('/json/lideres.json')
            .then(response =>  response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => console.error('Error al cargar los datos:', error));

    }, []);


    return (

        <div className="containerTeam" id='containerTeam'>
            <div className="section-title">
                <h1>{data ? data.title : 'Equipo de Lideres'}</h1>
            </div>


            <div className="rowTeam">

                {data &&
                    data.items.map(item => (
                        <div className="columnTeam" key={item} id='containerTeam'>
                            <div className="team">
                                <div className="team-img">
                                    <img className='teamImg' src="/images/logo-idec.png" alt="Team Image" />
                                </div>
                                <div className="team-content">
                                    <h2>{`${item.nombre} ${item.apellido}`}</h2>
                                    <h3>{item.equipo}</h3>
                                    <p>{item.pasaje}</p>
                                    <h4>Nada</h4>
                                </div>
                                <SocialMedia />
                            </div>
                        </div>
                    ))}
            </div>


        </div>

    )
}

export default TeamSection;