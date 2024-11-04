import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import Logo3DContact from './Logo3DContact';
import * as THREE from 'three';
import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Scene3DContact = ({hovered}) => {
  const { theme } = useContext(ThemeContext);

  const color = new THREE.Color(149 / 255, 68 / 255, 24 / 255).convertSRGBToLinear();
  const backgroundColor = theme === 'dark-theme'
    ? new THREE.Color(19 / 255, 19 / 255, 19 / 255).convertSRGBToLinear() // Color oscuro
    : new THREE.Color(235 / 255, 230 / 255, 224 / 255).convertSRGBToLinear(); // Color claro (blanco)

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
      event.preventDefault(); // Prevent default behavior
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
      camera={cameraRef.current} // Use the cameraa
      onCreated={({ gl }) => {
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.physicallyCorrectLights = true;
        gl.setClearColor(backgroundColor, 1);
      }}
    >

<SetBackground color={backgroundColor} />
      <directionalLight intensity={500} position={[1, 2, 1]} color={color} />
      <ambientLight intensity={5} /> 

      {/* Point lights with reduced intensity */}
      {/* <pointLight position={[0, 0, 60]} intensity={100} color={color} /> */}
      <pointLight position={[0, 20, 60]} intensity={100} color={color} />
      <pointLight position={[0, -20, 60]} intensity={100} color={color} />
      <pointLight position={[-40, 10, 60]} intensity={100} color={color} />
      <pointLight position={[40, 10, 60]} intensity={100} color={color} />


      <Logo3DContact hovered={hovered}/>
    </Canvas>
  );
};

export default Scene3DContact;
