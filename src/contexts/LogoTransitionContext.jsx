import { createContext, useContext, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LogoTransitionContext = createContext();

export const LogoTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transitionState, setTransitionState] = useState("idle"); // 'idle', 'transitioning', 'revealing'
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const debounceRef = useRef(false); // Prevent rapid clicks

  const viewportBorderWidth = useMemo(() => {
    return document.documentElement.clientWidth < document.documentElement.clientHeight
      ? "100vh"
      : "100vw";
  }, []);

  const handleLogoTransition = (path, event) => {
    if (path === location.pathname || transitionState !== "idle" || debounceRef.current) return;

    debounceRef.current = true; // Prevent multiple transitions
    setTimeout(() => (debounceRef.current = false), 1500); // Reset debounce after animations

    setClickPosition({ x: event.clientX, y: event.clientY });
    setTransitionState("transitioning");

    setTimeout(() => {
      navigate(path);
      setTransitionState("revealing");

      setTimeout(() => {
        setTransitionState("idle");
      }, 700); // Match the revealing animation duration
    }, 1000); // Delay to finish the initial transition
  };

  return (
    <LogoTransitionContext.Provider value={{ handleLogoTransition }}>
      {children}

      {/* Transitioning Circle */}
      {transitionState === "transitioning" && (
        <motion.div
          initial={{
            scale: 0,
            borderWidth: "0px",
            borderColor: "var(--cor-primary)",
            borderStyle: "solid",
            borderRadius: "50%",
            x: clickPosition.x,
            y: clickPosition.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: 1,
            borderWidth: viewportBorderWidth,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "20px",
            height: "20px",
            backgroundColor: "transparent",
            zIndex: 100000,
          }}
        />
      )}

      {/* Revealing Circle */}
      {transitionState === "revealing" && (
        <motion.div
          initial={{
            width: "0px",
            height: "0px",
            borderRadius: "50%",
            borderWidth: viewportBorderWidth,
            borderColor: "var(--cor-primary)",
            borderStyle: "solid",
            x: clickPosition.x,
            y: clickPosition.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: `200vw`,
            height: `200vh`,
            borderWidth: 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "transparent",
            zIndex: 100001,
          }}
        />
      )}
    </LogoTransitionContext.Provider>
  );
};

export const useLogoTransition = () => useContext(LogoTransitionContext);
