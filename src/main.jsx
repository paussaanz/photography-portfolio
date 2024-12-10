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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado:', registration);

        // Escucha los eventos del ciclo de vida del SW
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          console.log('Nuevo Service Worker encontrado:', installingWorker);

          installingWorker.addEventListener('statechange', () => {
            console.log('Estado del SW:', installingWorker.state);

            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Nuevo contenido disponible
                console.log('Nuevo contenido está disponible, recarga para actualizar.');
              } else {
                // Todo está precargado
                console.log('El contenido está disponible para usar sin conexión.');
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <MediaQueryProvider>
          <LoaderContextProvider>
            <ThemeProvider>
              <TransitionProvider>
                <LogoTransitionProvider>
                  <App />
                  <Footer />
                </LogoTransitionProvider>
              </TransitionProvider>
            </ThemeProvider>
          </LoaderContextProvider>
        </MediaQueryProvider>
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
