import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TransitionProvider } from "./contexts/transitionContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Footer from "./components/Footer/Footer.jsx";
import App from './App.jsx'
import { LenisProvider } from "./contexts/LenisContext.jsx";

import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.pathname)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <ThemeProvider>
          <TransitionProvider>
            <App />
            <Footer />
          </TransitionProvider>
        </ThemeProvider>
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
