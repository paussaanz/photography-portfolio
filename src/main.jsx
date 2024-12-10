import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import Footer from "./components/Footer/Footer.jsx";
import { BrowserRouter } from "react-router-dom";
import { TransitionProvider } from "./contexts/transitionContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { LenisProvider } from "./contexts/LenisContext.jsx";
import { LogoTransitionProvider } from "./contexts/LogoTransitionContext.jsx";
import { LoaderContextProvider } from "./contexts/LoaderContext.jsx";
import { MediaQueryProvider } from "./contexts/MediaQueryContext.jsx";
import './index.css'


const root = ReactDOM.createRoot(document.getElementById("root"));
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("Intentando registrar el Service Worker...");
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration);

        // Escuchar mensajes enviados desde el Service Worker
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data.type === "install-progress") {
            console.log(`Progreso de instalación: ${event.data.progress}%`);
          }
        });
      })
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  });
}


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <MediaQueryProvider>
          <ThemeProvider>
            <TransitionProvider>
              <LogoTransitionProvider>
                <App />
                {/* <Footer /> */}
              </LogoTransitionProvider>
            </TransitionProvider>
          </ThemeProvider>

        </MediaQueryProvider>
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
