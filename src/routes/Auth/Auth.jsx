// import { useState } from 'react';
import { supabase } from './supabaseClient';


export default function Auth() {
  // const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   setLoading(true);

  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  //     if (error) {
  //       alert(error.error_description || error.message);
  //     } else if (data) {
  //       alert(`Welcome, ${data.user.email}!`);
  //       console.log(data);
  //       // Puedes redirigir a otra página o realizar otras acciones después del inicio de sesión

  //     } else {
  //       alert("An unexpexted errrot a ocurrido");
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //     alert('An unexpected error occurred during login.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const handleSignUp = async (event) => {
  //   event.preventDefault();

  //   setLoading(true);
  //   const { data, error } = await supabase.auth.signUp({ email, password });

  //   if (error) {
  //     alert(error.error_description || error.message);
  //   } else {
  //     alert(`Welcome, ${data.email}! Please check your email for verification.`);
  //     // Puedes redirigir a otra página o realizar otras acciones después del registro
  //   }

  //   setLoading(false);
  // };

  // const style = {
  //   color: '#5E17EB',
  // };

  const welcome = {
    color: '#87b2bf',
  }

  async function handleSignInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async function signInWithFacebook() {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    })
  }



  return (
    <div className="cont-form">
      <div className="cont-fom">
        <div className="container text-h">
          <div>
            <span style={welcome}>
              Welcome IDEC
            </span>
          </div>
          <div>
            <button onClick={handleSignInWithGoogle} className='button-login'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <b className=''> Sign in Google</b>
            </button>
          </div>
          <div>
            <button onClick={signInWithFacebook} className='button-login'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
              </svg>
              <b className=''> Sign in Facebook</b>
            </button>
          </div>
        </div>
        {/* <form className="animate" onSubmit={handleLogin}>
          <div className="container">

            <input
              className="inputs"
              type="text"
              placeholder="email"
              name="email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />


            <input
              className="inputs"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />



            <div className="container" style={style}>
              <span className="psw">
                Forgot
                <a href="#">
                  password
                </a>
              </span>
            </div>


            <div>
              <button type="submit" className="button-login" onClick={handleLogin} disabled={loading}>
                {loading ? <span>Loading</span> : <span>Login</span>}
              </button>
            </div>

            <div>
              <button type="submit" className="button-login" onClick={handleSignUp} disabled={loading}>
                {loading ? <span>Loading</span> : <span>Sign Up</span>}
              </button>
            </div>
          </div>

        </form> */}
      </div>

      <div className="">
        <picture>
          <img src="./images/logo-idec.png" alt="" />
        </picture>
      </div>
    </div>
  );
}








