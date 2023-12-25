import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
//import { AuthProvider, useAuth } from './AuthContext';


function AppAuth() {
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
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default AppAuth

// AppAuth.jsx

// function AppAuth() {
//   return (
//     <AuthProvider>
//       <AuthComponent />
//     </AuthProvider>
//   );
// }

// const AuthComponent = () => {
//   const { session } = useAuth();
//   console.log('Sesión:', session);
//   return (
//     <div className="container" style={{ padding: '50px 0 100px 0' }}>
//        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
//     </div>
//   );
// };

// export default AppAuth;
