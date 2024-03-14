import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
// import dotenv from 'dotenv'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();