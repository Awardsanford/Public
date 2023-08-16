import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig'; // Import the config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
// import { getFirestore } from "firebase/firestore";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
