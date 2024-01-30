/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '/public/css/publication.css'
// TODO: Hooks
import { UserAuth } from './routes/Auth/AuthContext.jsx';

import Logo from './components/logo.jsx'
import LogoNavMenu from './components/logoNavMenu.jsx';
import Upload from './routes/ImageUploader.jsx';
import Idec from './routes/idec.jsx';
import AppAuth from './routes/Auth/AppAuth.jsx';
import Biblia from './routes/biblia.jsx';
import Publicaciones from './routes/publicaciones.jsx';
import Perfil from './routes/profile.jsx';
import Logout from './routes/Auth/Logout.jsx';
import PrincipiosDoctrinales from './routes/QuienesSomos/PrincipiosDoctrinales.jsx';
import DeclaracionDFe from './routes/QuienesSomos/declaracion-de-fe.jsx';
import Conexion2030 from './routes/QuienesSomos/conexion-20-30.jsx';
//FIXME: import RadioPlayer from './components/Radio.jsx';


import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa los scripts de Bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BrowserRouter, Redirect, Route, Link, Switch, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import Upload from './routes/ImageUploader.jsx';

const MenuNavbar = () => {
  const { session, signout, user } = UserAuth();
  // Verifica si hay una sesión
  const isAuthenticated = user.email;
  const currentPath = window.location.pathname

  const [searchTerm, setSearchTerm] = useState('');
  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });

  const handleSearch = () => {
    const iframe = document.getElementById('searchIframe');
    if (iframe) {
      // Actualiza el atributo src del iframe con la URL de búsqueda
      iframe.src = `https://www.bible.com/es/search/bible?query=${searchTerm}`;
      // https://dailyverses.net/es/
      // https://bible.knowing-jesus.com/Espa%C3%B1al/words/

      // Actualiza el tamaño del iframe después de realizar la búsqueda
      setIframeSize({ width: '100%', height: 600 });
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);

    // Actualiza el tamaño del iframe cuando cambia el input
    setIframeSize({ width: 0, height: 0 });
  };


  return (

    <BrowserRouter>
      <header>
        <Logo />
        {['xl'].map((expand) => (
          <Navbar key={expand} expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand></Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <LogoNavMenu />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href='/' style={{ display: 'flex' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="20" viewBox="0 0 48 48">
                        <path fill="#E8EAF6" d="M42 39L6 39 6 23 24 6 42 23z"></path><path fill="#C5CAE9" d="M39 21L34 16 34 9 39 9zM6 39H42V44H6z"></path><path fill="#B71C1C" d="M24 4.3L4 22.9 6 25.1 24 8.4 42 25.1 44 22.9z"></path><path fill="#D84315" d="M18 28H30V44H18z"></path><path fill="#01579B" d="M21 17H27V23H21z"></path><path fill="#FF8A65" d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"></path>
                      </svg>
                      <span style={{
                        display: '-webkit-inline-flex'
                      }}>Home</span>
                    </Nav.Link>
                    <Nav.Link href='/publico'>Publicaciones </Nav.Link>
                    <Nav.Link href='/biblia'> Biblia </Nav.Link>
                    <NavDropdown
                      title="Quienes somos"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href='/historia'>Historia</NavDropdown.Item>
                      <NavDropdown.Item href='/conexion'> Conexion 2030 </NavDropdown.Item>
                      <NavDropdown.Item href='/mision'>Mision y Vision </NavDropdown.Item>
                      <NavDropdown.Item href='/declaracion-de-fe'>Declaracion de Fe</NavDropdown.Item>
                      <NavDropdown.Item href='/principios-doctrinales'>Principios Doctrinales</NavDropdown.Item>
                      <NavDropdown.Divider />

                    </NavDropdown>
                    <NavDropdown
                      title="Ministerios"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href='/ge-junior'>GE Junior</NavDropdown.Item>
                      <NavDropdown.Item href='/ge-emergente'>GE Emergente</NavDropdown.Item>
                      <NavDropdown.Item href='/ministerio-de-la-mujer'>Ministerio de la Mujer</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                    {isAuthenticated ? (
                      <>


                        <NavDropdown
                          title={
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                <path fill="#607d8b" d="M39.6,27.2c0.1-0.7,0.2-1.4,0.2-2.2s-0.1-1.5-0.2-2.2l4.5-3.2c0.4-0.3,0.6-0.9,0.3-1.4L40,10.8	c-0.3-0.5-0.8-0.7-1.3-0.4l-5,2.3c-1.2-0.9-2.4-1.6-3.8-2.2L29.4,5c-0.1-0.5-0.5-0.9-1-0.9h-8.6c-0.5,0-1,0.4-1,0.9l-0.5,5.5	c-1.4,0.6-2.7,1.3-3.8,2.2l-5-2.3c-0.5-0.2-1.1,0-1.3,0.4l-4.3,7.4c-0.3,0.5-0.1,1.1,0.3,1.4l4.5,3.2c-0.1,0.7-0.2,1.4-0.2,2.2	s0.1,1.5,0.2,2.2L4,30.4c-0.4,0.3-0.6,0.9-0.3,1.4L8,39.2c0.3,0.5,0.8,0.7,1.3,0.4l5-2.3c1.2,0.9,2.4,1.6,3.8,2.2l0.5,5.5	c0.1,0.5,0.5,0.9,1,0.9h8.6c0.5,0,1-0.4,1-0.9l0.5-5.5c1.4-0.6,2.7-1.3,3.8-2.2l5,2.3c0.5,0.2,1.1,0,1.3-0.4l4.3-7.4	c0.3-0.5,0.1-1.1-0.3-1.4L39.6,27.2z M24,35c-5.5,0-10-4.5-10-10s4.5-10,10-10s10,4.5,10,10S29.5,35,24,35z"></path><path fill="#455a64" d="M24,13c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S30.6,13,24,13z M24,30c-2.8,0-5-2.2-5-5	s2.2-5,5-5s5,2.2,5,5S26.8,30,24,30z"></path>
                              </svg>
                              Setting
                            </span>
                          }
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                          drop={'start'}>
                          {/* <NavDropdown.Item href='/Upload'>Upload </NavDropdown.Item> */}
                          <NavDropdown.Divider />
                          <NavDropdown.Item href='/perfil/s/'>Perfil </NavDropdown.Item>
                          <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
                        </NavDropdown>
                        {['top'].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            placement={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Hello <strong>{user?.name}</strong>.
                              </Tooltip>
                            }
                          >
                            {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
                            <div className='profileNav'>
                              {user?.picture && <img className='imgNav' src={user?.picture} alt={user} />}
                            </div>
                          </OverlayTrigger>
                        ))}
                      </>
                    )
                      :
                      (
                        <>
                          <NavDropdown

                            title={
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                  <path fill="#607d8b" d="M39.6,27.2c0.1-0.7,0.2-1.4,0.2-2.2s-0.1-1.5-0.2-2.2l4.5-3.2c0.4-0.3,0.6-0.9,0.3-1.4L40,10.8	c-0.3-0.5-0.8-0.7-1.3-0.4l-5,2.3c-1.2-0.9-2.4-1.6-3.8-2.2L29.4,5c-0.1-0.5-0.5-0.9-1-0.9h-8.6c-0.5,0-1,0.4-1,0.9l-0.5,5.5	c-1.4,0.6-2.7,1.3-3.8,2.2l-5-2.3c-0.5-0.2-1.1,0-1.3,0.4l-4.3,7.4c-0.3,0.5-0.1,1.1,0.3,1.4l4.5,3.2c-0.1,0.7-0.2,1.4-0.2,2.2	s0.1,1.5,0.2,2.2L4,30.4c-0.4,0.3-0.6,0.9-0.3,1.4L8,39.2c0.3,0.5,0.8,0.7,1.3,0.4l5-2.3c1.2,0.9,2.4,1.6,3.8,2.2l0.5,5.5	c0.1,0.5,0.5,0.9,1,0.9h8.6c0.5,0,1-0.4,1-0.9l0.5-5.5c1.4-0.6,2.7-1.3,3.8-2.2l5,2.3c0.5,0.2,1.1,0,1.3-0.4l4.3-7.4	c0.3-0.5,0.1-1.1-0.3-1.4L39.6,27.2z M24,35c-5.5,0-10-4.5-10-10s4.5-10,10-10s10,4.5,10,10S29.5,35,24,35z"></path><path fill="#455a64" d="M24,13c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S30.6,13,24,13z M24,30c-2.8,0-5-2.2-5-5	s2.2-5,5-5s5,2.2,5,5S26.8,30,24,30z"></path>
                                </svg>
                                Setting
                              </span>
                            }
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                            drop={'start'}>
                            <NavDropdown.Item href='/register'>Register </NavDropdown.Item>
                            <NavDropdown.Divider />
                          </NavDropdown>
                        </>
                      )}
                  </Nav>
                  <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); }}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <Button onClick={handleSearch} variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>

          </Navbar>
        ))}
        <iframe
          id="searchIframe"
          title="Resultados de Búsqueda"
          width={iframeSize.width}
          height={iframeSize.height}
          frameBorder="0"
          src=""
        ></iframe>
      </header>
      {/* {isAuthenticated ? (<Upload />) : ("")} */}
      <>
        <Switch>
          {/* Otras rutas y componentes aquí */}
          <Route path="/">
            {isAuthenticated && currentPath === '/' ? <Upload /> : "" }
          </Route>
          {/* Otras rutas */}
        </Switch>
      </>

      <Switch>
        <Route path='/publico'>
          <Publicaciones />
        </Route>
        <Route path='/biblia'>
          <Biblia />
        </Route>
        <Route path='/historia' >

        </Route>
        <Route path='/conexion'>
          <Conexion2030 />
        </Route>
        <Route path='/mision'>

        </Route>
        <Route path='/declaracion-de-fe'>
          <DeclaracionDFe />
        </Route>
        <Route path='/principios-doctrinales'>
          <PrincipiosDoctrinales />
        </Route>
        <Route path='/ge-junior'>

        </Route>
        <Route path='/ge-emergente'>

        </Route>
        <Route path='/ministerio-de-la-mujer'>

        </Route>
        {/* <Route path="/Upload">
          <Upload />
        </Route> */}
        <Route path='/perfil/s/:userId'>
          <Perfil />
        </Route>
        <Route path='/perfil/s'>
          <AppAuth />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/register'>
          <AppAuth />
        </Route>
        <Route path='/'>
          <Idec />
        </Route>
      </Switch>

    </BrowserRouter>

  )
}



export default MenuNavbar;