import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App.jsx";
import "./index.css";

const routerOptions = {
  future: {
    v7_relativeSplatPath: true,  // Enable the relativeSplatPath flag
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter {...routerOptions}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
