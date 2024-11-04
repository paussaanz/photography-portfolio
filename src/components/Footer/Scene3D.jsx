import { Canvas, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import Logo3D from './Logo3D';
import * as THREE from 'three';
import { useContext, useEffect, useRef } from 'react';
import fontFam from './../../assets/fonts/Gamilia-Regular.ttf';
import { useTheme } from '../../contexts/ThemeContext';


const Scene3D = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark-theme';

  const backgroundColor = isDarkMode
    ? new THREE.Color(218 / 255, 106 / 255, 45 / 255).convertSRGBToLinear() // Color oscuro
    : new THREE.Color(52 / 255, 17 / 255, 22 / 255).convertSRGBToLinear(); // Color claro (blanco)

    const color = isDarkMode
    ? new THREE.Color(52 / 255, 17 / 255, 22 / 255).convertSRGBToLinear() // Color oscuro
    : new THREE.Color(0.8549, 0.4157, 0.1765).convertSRGBToLinear(); // Color claro (blanco)

    // const color = new THREE.Color(0.8549, 0.4157, 0.1765).convertSRGBToLinear();
    const text = "LIFE IS TOO\nSHORT FOR\nBORING WEBSITES"; // Texto con saltos de línea
  const lines = text.split('\n'); // Divide el texto en líneas

  const cameraRef = useRef(); // Ref to hold the camera instance

  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-10 * aspect, 10 * aspect, 10, -10, 0.1, 1000);
    camera.position.set(10, 10, 10); // Set the camera position
    camera.lookAt(0, 0, 0); // Look at the center of the scene
    camera.updateProjectionMatrix(); // Update the projection matrix

    cameraRef.current = camera; // Store camera instance in ref

    // Handle WebGL context loss
    const handleContextLoss = (event) => {
      console.warn('WebGL context lost!'); // Handle accordingly
    };

    const canvas = document.querySelector('canvas'); // Ensure you are targeting the right canvas
    canvas.addEventListener('webglcontextlost', handleContextLoss, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
    };
  }, []);

  const SetBackground = ({ color }) => {
    const { gl } = useThree();

    useEffect(() => {
      gl.setClearColor(color, 1);
      gl.renderLists.dispose();
    }, [color, gl]);
    return null;
  };

  
  return (
    <Canvas
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }} // Enable antialiasing
      camera={cameraRef.current} // Use the camera
      onCreated={({ gl }) => {
        gl.physicallyCorrectLights = true;
        gl.setClearColor(backgroundColor, 1);

        return () => {
          gl.forceContextLoss();
          gl.dispose();
        };
      }}
    >
      <SetBackground color={backgroundColor} />

      <directionalLight intensity={1} position={[1, 2, 1]} color={color} />
      <ambientLight intensity={0.5} /> {/* Reduced intensity */}

      {/* Point lights with reduced intensity */}
      <pointLight position={[0, 0, 60]} intensity={1} color={color} />
      <pointLight position={[0, 20, 60]} intensity={1} color={color} />
      <pointLight position={[0, -20, 60]} intensity={1} color={color} />
      <pointLight position={[-40, 10, 60]} intensity={1} color={color} />
      <pointLight position={[40, 10, 60]} intensity={1} color={color} />

      <Text
        characters='Hello, World!'
        fontSize={4.5}
        maxWidth={40}
        lineHeight={1.2}
        position={[0, 5, -10]}
        color={color}
        anchorX="center"
        anchorY="middle"
        font={fontFam}
        textAlign='center'
        material-toneMapped={false}
      >
        {lines.map((line, index) => (
          <Text
            key={index}
            position={[0, index * -5, 0]} // Adjust position in Y for each line
            fontSize={4.5}
            color={color}
            anchorX="center"
            anchorY="middle"
            font={fontFam}
            material-toneMapped={false}
          >
            {line}
          </Text>
        ))}
      </Text>

      <Logo3D />
    </Canvas>
  );
};

export default Scene3D;
