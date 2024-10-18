import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import Logo3D from './Logo3D';
import * as THREE from 'three';

const Scene3D = () => {
  const color = new THREE.Color(0.8549, 0.4157, 0.1765).convertSRGBToLinear();
  const backgroundColor = new THREE.Color(52 / 255, 17 / 255, 22 / 255).convertSRGBToLinear();
  const text = "LIFE IS TOO\nSHORT FOR\nBORING WEBSITES"; // Texto con saltos de línea
  const lines = text.split('\n'); // Divide el texto en líneas

  return (
    <Canvas
      style={{ background: 'transparent' }}
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.physicallyCorrectLights = true;
        gl.setClearColor(backgroundColor, 1);
      }}
    >
      <directionalLight intensity={100} position={[1, 2, 1]} color={color} />
      <ambientLight intensity={10000} />
      <pointLight position={[0, 0, 30]} intensity={50000} color={color} />
      <pointLight position={[0, 20, 30]} intensity={50000} color={color} />
      <pointLight position={[0, -20, 30]} intensity={50000} color={color} />
      <pointLight position={[-40, 10, 30]} intensity={50000} color={color} />
      <pointLight position={[40, 10, 30]} intensity={50000} color={color} />

      <Text
        characters='Hello, World!'
        fontSize={4.5}
        maxWidth={40}
        lineHeight={1.2}
        position={[0, 5, -10]}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="../src/assets/fonts/Gamilia-Regular.ttf"
        textAlign='center'
        material-toneMapped={false}
      >
        {lines.map((line, index) => (
          <Text
            key={index}
            position={[0, index * -5, 0]} // Ajusta la posición en Y para cada línea
            fontSize={4.5}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="../src/assets/fonts/Gamilia-Regular.ttf"
            material-toneMapped={false}
          >
            {line}
          </Text>
        ))}
      </Text>

      <Logo3D />
    </Canvas >
  );
};

export default Scene3D;
