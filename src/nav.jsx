/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Logo from './partials/logo.jsx'
import Upload from './routes/upload.jsx';
import Idec from './routes/idec.jsx';
import AppAuth from './routes/Auth/AppAuth.jsx';
import Biblia from './routes/biblia.jsx';
import Publicaciones from './routes/publicaciones.jsx';
import Login from './routes/Auth/Perfil.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
//Icons
import { BsFillGearFill } from "react-icons/bs";


import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react';
const MenuNavbar = () => {

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const user = supabase.auth.user();
      setSession(user);
    };

    // Lógica para obtener la sesión del usuario
    fetchSession();
  }, []); // Asegúrate de ejecutar esto solo una vez al montar el componente

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
                    <Logo />
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

                    <NavDropdown
                      title={`Setting`}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      drop={'start'}
                    >
                      <NavDropdown.Item href='/perfil'>Perfil </NavDropdown.Item>
                      <NavDropdown.Item href='/register'>Register </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href='/Upload'>Upload </NavDropdown.Item>
                    </NavDropdown>
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
        <Switch>
          <Route path='/register'>
            <AppAuth />
          </Route >
          <Route path='/perfil'>
            <Login />
          </Route >
          <ProtectedRoute
            path="/upload"
            component={Upload}
            isAuthenticated={session !== null}
          />
          <Route path='/biblia'>
            <Biblia />
          </Route>
          <Route path='/publico'>
            <Publicaciones />
          </Route>
          <Route path='/'>
            <Idec />
          </Route >
        </Switch>

      </header>


    </BrowserRouter>
  )
}



export default MenuNavbar;