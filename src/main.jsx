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

import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuNavbar from "./nav.jsx";
// import AppAuth from './routes/Auth/AppAuth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <MenuNavbar></MenuNavbar>
      
  </React.StrictMode>,
)
