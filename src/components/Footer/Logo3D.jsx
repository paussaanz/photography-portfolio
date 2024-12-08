import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from "../../assets/js/helper";
import { invalidate } from '@react-three/fiber';

const Logo3D = () => {
    const { nodes } = useGLTF("/3D/logo-web-3d-face-compression.gltf");
    const groupRef = useRef(null);

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

        console.log(scaleFactor, "SCALE")

        console.log(size, "SIZE")
        const onMouseMove = (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = (event.clientY / window.innerHeight) * 2 + 1; // Invertir Y para que sea correcto
            if (groupRef.current) {
                groupRef.current.rotation.y = mouseX * Math.PI / 70; // Rotación en Y
                groupRef.current.rotation.x = mouseY * Math.PI / 70; // Opcional: Rotación en X
            }

            invalidate();
        };

        const throttledMouseMove = (event) => {
            requestAnimationFrame(() => onMouseMove(event));
        };

        window.addEventListener("mousemove", throttledMouseMove);

        return () => {
            window.removeEventListener("mousemove", throttledMouseMove);
        };
    }, [nodes]);



    console.log
    return (
        <group ref={groupRef}>
            <mesh {...nodes.Curve001}>
                <MeshTransmissionMaterial
                    thickness={0.1}
                    roughness={0.3}
                    transmission={1}
                    ior={0.8}
                    chromaticAberration={0.09}
                    transparent
                />
            </mesh>
        </group>
    );
};

export default Logo3D;
