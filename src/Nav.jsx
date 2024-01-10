/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '/public/css/publication.css'
//Hooks
import UseProfile from './hooks/useProfile.js';
import { supabase } from './routes/Auth/supabaseClient.js';

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
import { BrowserRouter, Route, Link, Switch, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';


const MenuNavbar = () => {
  const { loading, username, website, avatarUrl, downloadImage } = UseProfile()
  const [session, setSession] = useState(null)
  //

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
  //
  useEffect(() => {
    if (!loading && avatarUrl) {
      downloadImage(avatarUrl); // Llama a downloadImage cuando el avatarUrl está disponible
    }
  }, [loading, avatarUrl, downloadImage]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
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
                    <Nav.Link href='/'>Home </Nav.Link>
                    <Nav.Link href='/publico' >Publicaciones </Nav.Link>
                    <Nav.Link href='/biblia'> Biblia </Nav.Link>
                    <NavDropdown
                      title="Quienes somos"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href='/historia'>Historia</NavDropdown.Item>
                      <NavDropdown.Item href='/conexion' > Conexion 2030 </NavDropdown.Item>
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
                    {session ? (
                      <>

                        <NavDropdown
                          title={`Setting`}
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                          drop={'start'}>
                          <NavDropdown.Item href='/Upload'>Upload </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href='/perfil'>Perfil </NavDropdown.Item>
                          <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
                        </NavDropdown>
                        {['top'].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            placement={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Hello <strong>{username}</strong>.
                              </Tooltip>
                            }
                          >
                            {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
                            <div className='profileNav'>
                              {avatarUrl && <img className='imgNav' src={avatarUrl} alt={username} />}
                            </div>
                          </OverlayTrigger>
                        ))}
                      </>
                    )
                      :
                      (
                        <NavDropdown
                          title={`Setting`}
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                          drop={'start'}>
                          <NavDropdown.Item href='/register'>Register </NavDropdown.Item>
                          <NavDropdown.Divider />
                        </NavDropdown>
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
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path='/perfil'>
          <Perfil />
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