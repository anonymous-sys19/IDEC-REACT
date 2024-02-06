/* eslint-disable no-undef */

import { useEffect, useState } from "react";
import React from "react";

const AboutSection = () => {
    const ImgResponsiv = {
        width: 'initial',
        height: '-webkit-fill-available',
        margin: 'unset',
        padding: '0.3rem',
    }

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/json/lideres.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
    }, []);

    const renderTimelineItem = (item, index) => (
        <li key={index} className={index % 2 === 1 ? 'timeline-inverted' : ''}>
            <div className="timeline-image">
                <img
                    style={ImgResponsiv}
                    className=""
                    src={item.image}
                    alt=""
                />
            </div>
            <div className="timeline-panel">
                <div className="timeline-heading">
                    <h4>{`${item.nombre} ${item.apellido}`}</h4>
                    <h4 className="subheading">{item.cargo}</h4>
                </div>
                <div className="timeline-body">
                    <p className="text-muted"><h5>Vision</h5> {item.vision.includes("Proverbios 3:5-6") ? (
                         <span dangerouslySetInnerHTML={{ __html: item.vision.replace('Proverbios 3:5-6', '<strong>Proverbios 3:5-6</strong>') }} />
                    ) : (
                        item.vision
                    )}</p>

                    <p className="text-muted"><h5>Mision</h5> {item.mision}</p>
                </div>
            </div>
        </li>
    );



    return (
        <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">
                            Lideres
                        </h2>
                        <li className="section-subheading text-muted"
                            style={
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column-reverse',
                                }
                            }
                        >
                            <a href="https://bible.knowing-jesus.com/Espa%C3%B1al/topics/Los-L%C3%ADderes-Espirituales,">
                                Deuteronomio 18:5
                            </a>
                            <p style={{
                                width: '70%'
                            }}>
                                Porque el SEÑOR tu Dios le ha escogido a él y a sus hijos de <b>entre</b> todas tus tribus, para que esté <b>allí</b> y sirva en el nombre del SEÑOR, para siempre.

                            </p>


                        </li>
                    </div>
                </div>
                <div className="row timelimeFather1">
                    <div className="col-lg-12">
                        <ul className="timeline">
                            {data && data.items.map((item, index) => (
                                renderTimelineItem(item, index)
                            ))}
                            <li className="timeline-inverted">
                                <div className="timeline-image">
                                    <h4>
                                        Be Part
                                        <br />
                                        Of Our
                                        <br />
                                        Story!
                                    </h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )


};
export default AboutSection;