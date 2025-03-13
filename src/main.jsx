import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const routerOptions = {
  future: {
    v7_startTransition: true,
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter {...routerOptions}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
