import { useGLTF, MeshTransmissionMaterial, Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

const Logo3D = () => {
    const { nodes } = useGLTF("/3D/logo-web-3d-face-compression.gltf");
    const { viewport } = useThree();
    const groupRef = useRef(null);
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-10 * aspect, 10 * aspect, 10, -10, 0.1, 1000);

    const materialProps = useControls({
        thickness: { value: 0.1, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 0.8, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.3, min: 0, max: 1 },
        transparent: true,
    });

    useEffect(() => {
        const model = nodes.Curve001;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        if (groupRef.current) {
            groupRef.current.position.set(0, 0, 0);
        }

        const size = box.getSize(new THREE.Vector3()).length();
        const scaleFactor = 12 / size;
        groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

        camera.position.set(10, 10, 10);
        camera.lookAt(0, 0, 0);

        const onMouseMove = (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = (event.clientY / window.innerHeight) * 2 + 1; // Invertir Y para que sea correcto
            if (groupRef.current) {
                groupRef.current.rotation.y = mouseX * Math.PI / 50; // Rotación en Y
                groupRef.current.rotation.x = mouseY * Math.PI / 50; // Opcional: Rotación en X
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [camera, nodes]);

    return (
        <group ref={groupRef} scale={viewport.width / 3.5}>
            <mesh {...nodes.Curve001}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    );
};

export default Logo3D;
