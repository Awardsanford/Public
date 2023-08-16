import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const nav = useNavigate();
  const popoverRef = useRef();
  const inputRef = useRef(null);
  const forgotPasswordLinkStyle = {
    color: '#007bff', // Blue color
    textDecoration: 'none', // Remove underline
    display: 'block',
    marginTop: '15px',
  };

  const forgotPasswordLinkHoverStyle = {
    textDecoration: 'underline', // Add underline on hover    
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      setLoginError('');
      nav('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password');
    }

    

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
      handleLogin();
    }
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current.focus();
  }, []);

 

  return (    
    <div className="container mt-5" onKeyPress={handleKeyPress}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Log In</div>
            <div className="card-body">            
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}                    
                  onChange={(e) => setEmail(e.target.value)}
                  ref={inputRef}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Log In
                </button>
                {loginError && <span style={{ color: 'red', marginLeft: '20px' }}>{loginError}</span>}
                <p>
                  <Link
                    to="/forgot-password"
                    style={forgotPasswordLinkStyle}
                    className="forgot-password-link"
                  >
                    Forgot Password
                  </Link>
                </p>
              </div>
            </div>
            <div className="card-footer" >
              <p>
                Don't have an account? <Link to="/create-account">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
