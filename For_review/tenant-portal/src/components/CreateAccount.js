import React, { useState, useEffect, useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const errorMessages = {
  [AuthErrorCodes.EMAIL_EXISTS]: 'This email is already in use.',
  [AuthErrorCodes.INVALID_EMAIL]: 'Please enter a valid email.',
  [AuthErrorCodes.WEAK_PASSWORD]: 'Password must contain 6 or more characters',  
};

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigate();
  const inputRef = useRef(null);
  
  
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created successfully');
      
      console.log(db);
 

      try {
        const docRef = await addDoc(collection(db, "users"), {
          user: email,
          firstName: null,
          lastName: null
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }


      auth.onAuthStateChanged((user) => {
        if (user) {
          nav('/dashboard');
        } else {
          console.error('Account creation error:');          
          setErrorMessage('Error creating account. Please try again.');    
        }
      });        
    } catch (error) {
      console.error('Account creation error:', error);
      const errorCode = error.code;
      const friendlyErrorMessage = errorMessages[errorCode] || 'Error creating account. Please try again.';          
      setErrorMessage(friendlyErrorMessage);      
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
          <div className="card-header">Create Account
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateAccount}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={inputRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>

              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
              {errorMessage && <span style={{ color: 'red', marginLeft: '20px' }}>{errorMessage}</span>}
              </div>
              {/* <p>{errorMessage}</p> */}
            </form>
          </div>
          <div className="card-footer">
            <p>
              Already have an account? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CreateAccount;