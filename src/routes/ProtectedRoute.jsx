/* eslint-disable react/prop-types */
//import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { supabase } from './Auth/supabaseClient.js';
import AppAuth from './Auth/AppAuth.jsx';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const [session, setSession] = useState(null)
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])

  return (
    <Route
      {...rest}
      render={(props) => {
        // Si hay sesión, renderiza el componente protegido, de lo contrario, redirige
        return AppAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
