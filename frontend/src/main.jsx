import React from 'react';
import './styles/styleReset.css'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  </React.StrictMode>
)
