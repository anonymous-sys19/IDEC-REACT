/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Logo from './partials/logo.jsx'
import LogoNavMenu from './partials/logoNavMenu.jsx';
import Upload from './routes/ImageUploader.jsx';
import Idec from './routes/idec.jsx';
import Auth from './routes/Auth/Auth.jsx';
import  AppAuth  from './routes/Auth/AppAuth.jsx';
import Biblia from './routes/biblia.jsx';
import Publicaciones from './routes/publicaciones.jsx';
import Perfil from './routes/Auth/Perfil.jsx';
import Logout from './routes/Auth/Logout.jsx';

import { supabase } from './routes/Auth/supabaseClient.js';
import ProtectedRoute from './routes/ProtectedRoute.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa los scripts de Bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
//Icons
import { BsFillGearFill } from "react-icons/bs";


import { BrowserRouter, Route, Link, Switch, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';


const MenuNavbar = () => {

  const [session, setSession] = useState(null)
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
          <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
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
                      <NavDropdown
                        title={`Setting`}
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                        drop={'start'}>
                        <NavDropdown.Item href='/Upload'>Upload </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='/perfil'>Perfil </NavDropdown.Item>
                        <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
                      </NavDropdown>
                    ) : (
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
        {/* <ProtectedRoute path="/perfil" component={Perfil} />
            <ProtectedRoute path="/upload" component={Upload} />
            <ProtectedRoute path="/logout" component={Logout} /> */}
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
        <Route>
          <Idec />
        </Route>
        <Route path='/'>
          <Idec />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}



export default MenuNavbar;