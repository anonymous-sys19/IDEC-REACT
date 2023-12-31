import { useState } from 'react';
import { supabase } from './supabaseClient';


export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert(error.error_description || error.message);
      } else if (data) {
        alert(`Welcome, ${data.user.email}!`);
        console.log(data);
        // Puedes redirigir a otra página o realizar otras acciones después del inicio de sesión

      } else {
        alert("An unexpexted errrot a ocurrido");
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };


  const handleSignUp = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert(`Welcome, ${data.email}! Please check your email for verification.`);
      // Puedes redirigir a otra página o realizar otras acciones después del registro
    }

    setLoading(false);
  };

  const style = {
    color: '#5E17EB',
  };
  const h2Login = {
    color: '#8c52ff',
  }
  const welcome = {
    color: '#87b2bf',
  }
  return (
    <div className="cont-form">
      <div className="cont-fom">
        <div className="container text-h">
          <h2 style={h2Login}>
            Logín
          </h2>
          <span style={welcome}>
            Welcome IDEC
          </span>
        </div>
        <form className="animate" onSubmit={handleLogin}>
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

        </form>
      </div>

      <div className="">
        <picture>
          <img src="./images/logo-idec.png" alt="" />
        </picture>
      </div>
    </div>
  );
}








