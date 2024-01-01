/* eslint-disable no-undef */
const AboutSection = () => {

    const ImgResponsiv = {

        width: 'initial',
        height: '-webkit-fill-available',
        margin: 'unset',
        padding: '0.3rem',

    }

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
                                'justify-content': 'center',
                                'align-items': 'center',
                                'flex-direction': 'column-reverse',
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
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="timeline">
                            <li>
                                <div className="timeline-image">
                                    <img
                                        style={
                                            ImgResponsiv
                                        }
                                        className=""
                                        src="/images/logo-idec.png"
                                        alt=""

                                    />
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>
                                            2009-2011
                                        </h4>
                                        <h4 className="subheading">
                                            Our Humble Beginnings
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-image">
                                    <img
                                        style={
                                            ImgResponsiv
                                        }
                                        className=""
                                        src="/images/logo-idec.png"
                                        alt=""

                                    />
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>
                                            March 2011
                                        </h4>
                                        <h4 className="subheading">
                                            An Agency is Born
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-image">
                                    <img
                                        style={
                                            ImgResponsiv
                                        }
                                        className=""
                                        src="/images/logo-idec.png"
                                        alt=""

                                    />
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>
                                            December 2012
                                        </h4>
                                        <h4 className="subheading">
                                            Transition to Full Service
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-image">
                                    <img
                                        style={
                                            ImgResponsiv
                                        }
                                        className=""
                                        src="/images/logo-idec.png"
                                        alt=""

                                    />
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>
                                            July 2014
                                        </h4>
                                        <h4 className="subheading">
                                            Phase Two Expansion
                                        </h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!
                                        </p>
                                    </div>
                                </div>
                            </li>
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