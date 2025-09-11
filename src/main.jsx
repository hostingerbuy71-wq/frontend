import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// Configure Axios base URL from Vite env so all axios calls use backend automatically
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || ''
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
