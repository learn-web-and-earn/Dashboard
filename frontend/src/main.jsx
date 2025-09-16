import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FirebaseProvider } from './context/Firebase'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
    </BrowserRouter>
  </StrictMode>,
)

