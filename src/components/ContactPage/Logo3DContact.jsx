import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { ThemeContext } from "../../contexts/ThemeContext";

const Logo3D = ({hovered}) => {
    const { theme } = useContext(ThemeContext);
    const { nodes } = useGLTF("/3D/syp-3.gltf");
    const groupRef = useRef(null);
    const materialRef = useRef(null);
    const [targetColor, setTargetColor] = useState(new THREE.Color("#ffffff")); // Initial color

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

        const onMouseMove = (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = (event.clientY / window.innerHeight) * 2 + 1; // Invertir Y para que sea correcto
            if (groupRef.current) {
                groupRef.current.rotation.y = mouseX * Math.PI / 15; // Rotación en Y
                groupRef.current.rotation.x = mouseY * Math.PI / 15; // Opcional: Rotación en X
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

    useFrame(() => {
        if (materialRef.current) {
            const currentColor = new THREE.Color(materialRef.current.color.getHex());
            const colorChangeSpeed = 0.05; // Adjust speed as needed
            const hoverColor = theme === 'dark-theme'
            ? new THREE.Color("#6B5154")
            : new THREE.Color("#DA6A2D")

            const normalColor = new THREE.Color("#EBE6E0");
            const target = hovered ? hoverColor : normalColor;

            // Smooth transition between current color and target color
            currentColor.lerp(target, colorChangeSpeed);
            materialRef.current.color.set(currentColor);
        }
    });

    return (
        <group ref={groupRef}>
            <mesh {...nodes.Curve}>
                <MeshTransmissionMaterial
                    ref={materialRef}
                    color={targetColor}  // This will initialize the color
                    metalness={0}        // No metallic effect to keep a pure glass look
                    transmission={0.9}   // High transmission to ensure material is mostly transparent
                    roughness={0}        // Completely smooth surface for clear glass appearance
                    chromaticAberration={0.05} // Slight color fringing for a subtle glass prism effect
                    thickness={0.1}      // Controls how much the light bends, thinner glass bends less
                    ior={1.5}            // Index of Refraction similar to glass, affects light bending
                    envMapIntensity={0.5}
                    transparent
                />
            </mesh>
        </group>
    );
};

export default Logo3D;
