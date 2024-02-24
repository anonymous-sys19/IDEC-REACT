/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialMedia from '../components/Social';
import '/public/css/TeamSection.css'
import { useState, useEffect } from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
const TeamSection = ({ scrollPosition }) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('/json/lideres.json')
            .then(response => response.json())
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
                                    {item.image ? (
                                        <LazyLoadImage className='teamImg' src={item.image} alt="Team Image" scrollPosition={scrollPosition} />
                                    ) : (
                                        <LazyLoadImage className='teamImg' src="/images/logo-idec.png" alt="Team Image" scrollPosition={scrollPosition} />
                                    )}
                                </div>
                                <div className="team-content">
                                    <h2>{`${item.nombre} ${item.apellido}`}</h2>
                                    <h3>{item.equipo}</h3>
                                    <p>{item.pasaje}</p>
                                    <h4>{item.verse}</h4>
                                </div>
                                <SocialMedia
                                    facebook={item.facebook}
                                    instagran={item.instagran}
                                    whasapp={item.whatsapp}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default trackWindowScroll(TeamSection);