import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Logo3D from './Logo3D';

const Scene3D = () => {
    return (
        <>
            <Canvas style={{ background: 'transparent' }}>
                <directionalLight intensity={200} position={[0, 3, 2]}/>
                <Environment preset='studio'/>
                <Logo3D/>

            </Canvas>
        </>
    );
};

export default Scene3D;
