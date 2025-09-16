import { createRoot } from 'react-dom/client'
import './index.css'
import { FirebaseProvider } from './context/Firebase'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FirebaseProvider>
      <App />
      <ToastContainer /> {/* ✅ must be inside app */}
    </FirebaseProvider>
  </BrowserRouter>
)

