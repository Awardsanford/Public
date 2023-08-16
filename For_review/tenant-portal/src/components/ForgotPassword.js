import React, { useState, useRef, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import { Link } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function ForgotPassword() {
  const inputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');  
  const forgotPasswordLinkStyle = {
    color: '#007bff', // Blue color
    textDecoration: 'none', // Remove underline
    display: 'block',
    marginTop: '10px',
    marginLeft: '5px',
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent successfully.');
    } catch (error) {
      setMessage('Error sending reset email. Please check your email.');
    }
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Forgot Password</div>
            <div className="card-body">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={inputRef}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    style={{ marginTop: '20px', marginRight: '10px' }}
                    className="btn btn-primary btn-block"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                  {message && (
                    <p style={{ color: 'green', marginTop: '30px' }}>{message}</p>
                  )}
                </div>
              </div>
              <p>
                <Link
                  to="/login"
                  style={forgotPasswordLinkStyle}
                  className="login-link"
                >
                  Return to Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
