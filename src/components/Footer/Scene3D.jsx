import { Canvas } from '@react-three/fiber';
import { Plane, Text } from '@react-three/drei';
import Logo3D from './Logo3D';
import * as THREE from 'three'; // Ensure THREE is imported

const Scene3D = () => {
  // Use sRGB color and convert to linear space
  const color = new THREE.Color('#DA6A2D').convertSRGBToLinear();
  const logoBackgroundColor = new THREE.Color('#FFFFFF').convertSRGBToLinear();

  console.log(color)
  return (
    <Canvas 
      style={{ background: '#transparent' }} // Set a contrasting background
      gl={{ alpha: true }} 
      onCreated={({ gl }) => {
        gl.outputEncoding = THREE.sRGBEncoding; // Ensure proper color management
      }}
    >
      {/* Reduced light intensities */}
      <directionalLight intensity={1008} position={[1, 2, 1]} />
      <ambientLight intensity={345987345987239870} />
      <pointLight position={[0, 0, 5]} intensity={621} color={"#ff0000"} />

      {/* <Plane args={[10, 10]} position={[0, 0, -5]} rotation={[-Math.PI / 2, 20, 20]}>
        <meshBasicMaterial color={logoBackgroundColor} />
      </Plane> */}

      {/* Text behind the logo */}
      <Text
        fontSize={2.5}
        maxWidth={30}
        lineHeight={1.2}
        position={[0, -1, -10]}
        color={color}  // Set the text color to #DA6A2D
        anchorX="center"
        anchorY="middle"
        font="../src/assets/fonts/Gunterz-Bold.ttf" // Make sure this path is correct
        textAlign='center'
      >
        LIFE IS TOO
        SHORT FOR
        BORING WEBSITES
      </Text>

      {/* Render the 3D logo */}
      <Logo3D />
    </Canvas>
  );
};

export default Scene3D;
