import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useContext, useMemo } from "react";
import * as THREE from "three";
import Logo3DContact from "./Logo3DContact";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const Scene3DContact = ({ hovered }) => {
  const { theme } = useContext(ThemeContext);
  const { isMobile } = useMediaQuery();
  const cameraRef = useRef();

  // Memoize colors to avoid recalculations
  const { color, backgroundColor } = useMemo(() => {
    const primaryColor = new THREE.Color(149 / 255, 68 / 255, 24 / 255).convertSRGBToLinear();
    const bgColor =
      theme === "dark-theme"
        ? new THREE.Color(19 / 255, 19 / 255, 19 / 255).convertSRGBToLinear()
        : new THREE.Color(235 / 255, 230 / 255, 224 / 255).convertSRGBToLinear();

    return { color: primaryColor, backgroundColor: bgColor };
  }, [theme]);

  // Resize camera only when necessary
  useEffect(() => {
    const updateCameraAspect = () => {
      if (!cameraRef.current) return;
      const aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.left = -10 * aspect;
      cameraRef.current.right = 10 * aspect;
      cameraRef.current.top = 10;
      cameraRef.current.bottom = -10;
      cameraRef.current.updateProjectionMatrix();
    };

    updateCameraAspect();
    window.addEventListener("resize", updateCameraAspect);

    return () => window.removeEventListener("resize", updateCameraAspect);
  }, []);

  // Handle WebGL context loss efficiently
  useEffect(() => {
    const handleContextLoss = (event) => {
      event.preventDefault();
      console.warn("WebGL context lost!");
    };

    const canvas = document.querySelector("canvas");
    if (canvas) canvas.addEventListener("webglcontextlost", handleContextLoss);

    return () => {
      if (canvas) canvas.removeEventListener("webglcontextlost", handleContextLoss);
    };
  }, []);

  // Set background color efficiently
  const SetBackground = ({ color }) => {
    const { gl } = useThree();
    useEffect(() => {
      gl.setClearColor(color, 1);
      gl.renderLists.dispose(); // Clear unused render lists
    }, [color, gl]);
    return null;
  };

  return (
    <Canvas
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
        marginTop: isMobile ? "-60px" : "0",
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance", // Prioritize performance
      }}
      camera={cameraRef.current}
      onCreated={({ gl }) => {
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.physicallyCorrectLights = true;
        gl.setClearColor(backgroundColor, 1);
      }}
    >
      <SetBackground color={backgroundColor} />

      {/* Optimized Lights */}
      <directionalLight intensity={500} position={[1, 2, 1]} color={color} />
      <ambientLight intensity={0.5} />

      <pointLight position={[0, 20, 60]} intensity={0.8} color={color} />
      <pointLight position={[0, -20, 60]} intensity={0.8} color={color} />
      <pointLight position={[-40, 10, 60]} intensity={0.6} color={color} />
      <pointLight position={[40, 10, 60]} intensity={0.6} color={color} />

      <Logo3DContact hovered={hovered} isMobile={isMobile} />
    </Canvas>
  );
};

export default Scene3DContact;
