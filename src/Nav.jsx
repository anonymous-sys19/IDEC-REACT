/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '/public/css/publication.css'
//Hooks
import UseProfile from './hooks/useProfile.js';

import Logo from './partials/logo.jsx'
import LogoNavMenu from './partials/logoNavMenu.jsx';
import Upload from './routes/ImageUploader.jsx';
import Idec from './routes/idec.jsx';
import AppAuth from './routes/Auth/AppAuth.jsx';
import Biblia from './routes/biblia.jsx';
import Publicaciones from './routes/publicaciones.jsx';
import Perfil from './routes/profile.jsx';
import Logout from './routes/Auth/Logout.jsx';
import { supabase } from './routes/Auth/supabaseClient.js';

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
                      <NavDropdown.Item > <Link to='/historia'>Historia</Link></NavDropdown.Item>
                      <NavDropdown.Item > <Link to='/conexion'>Conexion 2030</Link> </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item > <Link to='/mision'>Mision y Vision</Link> </NavDropdown.Item>
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
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </header>
      <Switch>
        <Route path='/publico'>
          <Publicaciones />
        </Route>
        <Route path='/biblia'>
          <Biblia />
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