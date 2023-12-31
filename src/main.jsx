import '/public/css/animations.css'
import '/public/css/footer.css'
import '/public/css/header.css'
import '/public/css/idec.css'
import '/public/css/nav.css'
import '/public/css/portafolio.css'
import '/public/css/profile.css'
import '/public/css/publication.css'
import '/public/css/register.css'
import '/public/css/sobreNosotros.css'
import '/public/css/style.css'
import '/public/css/index.css'
import '/node_modules/animate.css/animate.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuNavbar from "./Nav.jsx";
import { BrowserRouter as Router } from 'react-router-dom';
// import AppAuth from './routes/Auth/AppAuth.jsx'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(fab);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
      <MenuNavbar />
      </Router>
  </React.StrictMode>,
)
