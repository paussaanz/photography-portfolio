import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { useControls } from "leva";

const Logo3D = () => {
    const { nodes } = useGLTF("/3D/syp-2.gltf");
    const groupRef = useRef(null);

    const materialProps = useControls({
        thickness: { value: 1, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.45, min: 1, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.03, min: 0, max: 1 },
        transparent: true,
        opacity: 0.9, // Opacity slightly reduced for transparency effect
    });
    
    console.log(nodes)
    useEffect(() => {
        const model = nodes.Curve;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        if (groupRef.current) {
            groupRef.current.position.set(0, 0, 0);
        }

        const size = box.getSize(new THREE.Vector3()).length();
        const scaleFactor = 10 / size;
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
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (groupRef.current) {
                groupRef.current.scale.set(1, 1, 1); // Reset scale on unmount
            }
        };
    }, [nodes]);

    return (
        <group ref={groupRef}>
            <mesh {...nodes.Curve}>
                <MeshTransmissionMaterial
                    thickness={0.1}
                    roughness={0.1}
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
