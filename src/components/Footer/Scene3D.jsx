import { Canvas, useThree } from '@react-three/fiber';
import Logo3D from './Logo3D';
import * as THREE from 'three';
import { useEffect, useMemo } from 'react';
import fontFam from './../../assets/fonts/Gamilia-Regular.ttf';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../../assets/js/helper';
import { useMediaQuery } from '../../contexts/MediaQueryContext';

const Scene3D = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark-theme';
  const { isMobile } = useMediaQuery();

  const backgroundColor = useMemo(
    () =>
      new THREE.Color(
        isDarkMode ? 218 / 255 : 52 / 255,
        isDarkMode ? 106 / 255 : 17 / 255,
        isDarkMode ? 45 / 255 : 22 / 255
      ).convertSRGBToLinear(),
    [isDarkMode]
  );

  const color = useMemo(
    () =>
      new THREE.Color(
        isDarkMode ? 52 / 255 : 0.8549,
        isDarkMode ? 17 / 255 : 0.4157,
        isDarkMode ? 22 / 255 : 0.1765
      ).convertSRGBToLinear(),
    [isDarkMode]
  );

  const text = "LIFE IS TOO\nSHORT FOR\nBORING WEBSITES";
  const lines = text.split('\n');
  const textMbl = "NO TIME\nFOR BORING\nWEBSITES";
  const linesMbl = textMbl.split('\n');

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
      // frameloop="demand"
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", precision: "mediump" }} // Optimizamos el canvas
      camera={{
        near: 0.1,
        far: 1000,
        position: [0, 0, 0],
        zoom: 0.5,
      }}
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

      {/* <directionalLight intensity={1} position={[1, 2, 1]} color={color} />
      <ambientLight intensity={0.3} /> */}

      <Text
        maxWidth={40}
        position={[0, 5, -10]}
        color={color}
        anchorX="center"
        anchorY="middle"
        font={fontFam}
        textAlign="center"
        material-toneMapped={false}
      >
        {(isMobile ? linesMbl : lines).map((line, index) => (
          <Text
            key={index}
            position={[0, index * -5, 0]}
            lineHeight={1}
            fontSize={isMobile ? 3.5 : 6}
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


