import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* // React-router is now generally moved from browserROuter -->> RouterProvider  but we are using older way*/}
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
