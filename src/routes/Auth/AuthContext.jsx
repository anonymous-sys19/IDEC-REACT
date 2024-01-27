/* eslint-disable react/prop-types */


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
        // console.log("supabase event: ", event);
        if (session == null) {
          // console.log('No hay Session');

        }
        else {
          setUser(session?.user.user_metadata);
          // eslint-disable-next-line no-unused-vars
          const { user } = session;
          // console.log(user);
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
