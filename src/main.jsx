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
                  {/* <Footer /> */}
                </LogoTransitionProvider>
              </TransitionProvider>
            </ThemeProvider>
          </LoaderContextProvider>
        </MediaQueryProvider>
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
