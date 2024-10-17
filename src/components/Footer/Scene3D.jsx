import { Canvas } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import Logo3D from './Logo3D';

const Scene3D = () => {
    return (
        <>
            <Canvas style={{ background: 'transparent' }}>
                <directionalLight intensity={200} position={[0, 3, 2]}/>
                <Environment preset='studio'/>
                <Text
                    fontSize={20} // Adjust the font size as needed
                    position={[0, 0, -10]} // Position the text behind the 3D logo
                    color="white" // Color of the text
                >
                    .SYP
                </Text>

                <Logo3D/>

            </Canvas>
        </>
    );
};

export default Scene3D;
