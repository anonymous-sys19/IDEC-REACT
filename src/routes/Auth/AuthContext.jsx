/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userSession = await supabase.auth.getSession();
            setSession(userSession);
        };

        fetchData();
        const callback = (event, session) => {
            // Manejar el cambio en el estado de autenticación aquí
            console.log('Cambio en el estado de autenticación:', event, session);
        };

        const { data: { authListener } } = supabase.auth.onAuthStateChange(callback)
       
        return () => {
            // Llamamos a la función devuelta por onAuthStateChange para cancelar la suscripción.
            authListener.unsubscribe();
        };
    }, []);


    const updateSession = (newSession) => {
        setSession(newSession);
    };

    return (
        <AuthContext.Provider value={{ session, updateSession }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
