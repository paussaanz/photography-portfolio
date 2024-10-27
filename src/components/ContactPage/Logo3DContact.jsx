import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";

const Logo3D = ({hovered}) => {
    const { nodes } = useGLTF("/3D/syp-3.gltf");
    const groupRef = useRef(null);
    const materialRef = useRef(null);
    const [targetColor, setTargetColor] = useState(new THREE.Color("#ffffff")); // Initial color

    // Colors for normal and hover states
    // const normalColor = "#ffffff"; // White
    // const hoverColor = "#ff0000"; // Red

    // const materialProps = useControls({
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    //     ior: { value: 1.45, min: 1, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.03, min: 0, max: 1 },
    //     transparent: true,
    //     opacity: 0.9, // Opacity slightly reduced for transparency effect
    //     color: 'red',
    //     thickness: { value: 1, min: 0, max: 3, step: 0.05 },

    // });

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
            const hoverColor = new THREE.Color("#DA6A2D");
            const normalColor = new THREE.Color("#EBE6E0");
            const target = hovered ? hoverColor : normalColor;

            // Smooth transition between current color and target color
            currentColor.lerp(target, colorChangeSpeed);
            materialRef.current.color.set(currentColor);
        }
    });


    // const onHover = (e) => {
    //     e.stopPropagation();
    //     setHovered(true);
    // };

    // const onUnhover = (e) => {
    //     e.stopPropagation();
    //     setHovered(false);
    // };


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
