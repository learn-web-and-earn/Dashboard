import { createRoot } from "react-dom/client";
import "./index.css";
import { FirebaseProvider } from "./context/Firebase";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Toast styles
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // ✅ PayPal SDK provider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FirebaseProvider>
      {/* ✅ Provide PayPal client ID globally */}
      <PayPalScriptProvider options={{ "client-id": "AbC1234YourRealSandboxID" }}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </PayPalScriptProvider>
    </FirebaseProvider>
  </BrowserRouter>
);
