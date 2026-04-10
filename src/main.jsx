import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext.jsx";
import '@fontsource-variable/lora/wght.css';
import '@fontsource-variable/roboto/wght.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthContextProvider>
          <Router>
              <App />
          </Router>
      </AuthContextProvider>
  </StrictMode>,
)
