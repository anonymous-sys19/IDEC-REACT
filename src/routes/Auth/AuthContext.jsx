/* eslint-disable react/prop-types */
// import { useState, useEffect, createContext, useContext } from 'react';
// import { supabase } from './supabaseClient';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [session, setSession] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const userSession = await supabase.auth.getSession();
//             setSession(userSession);
//         };

//         fetchData();
//         const callback = (event, session) => {
//             // Manejar el cambio en el estado de autenticación aquí
//             console.log('Cambio en el estado de autenticación:', event, session);
//         };

//         const { data: { authListener } } = supabase.auth.onAuthStateChange(callback)

//         return () => {
//             // Llamamos a la función devuelta por onAuthStateChange para cancelar la suscripción.
//             authListener.unsuscribe()
//         };
//     }, []);


//     const updateSession = (newSession) => {
//         setSession(newSession);
//     };

//     return (
//         <AuthContext.Provider value={{ session, updateSession }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export { AuthProvider, useAuth };


import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
// import { useHistory } from "react-router-dom";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("A ocurrido un error durante la autenticación");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error)
      throw new Error("A ocurrido un error durante el cierre de sesión");
  }
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("supabase event: ", event);
        if (session == null) {
          console.log('No hay Session');

        }
        else {
          setUser(session?.user.user_metadata);
          const { user } = session;
          console.log(user);
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);
 
  return (
    <AuthContext.Provider value={{ signInWithGoogle, signout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
