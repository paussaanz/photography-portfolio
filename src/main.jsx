import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Footer from "./components/Footer/Footer.jsx";
import { TransitionProvider } from "./contexts/transitionContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.pathname)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransitionProvider>
          <App />
          <Footer />
        </TransitionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
