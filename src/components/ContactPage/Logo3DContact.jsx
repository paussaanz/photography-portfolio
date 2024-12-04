import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, Box3, Vector3 } from "three"; // Import only required classes
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Logo3D = ({ hovered, isMobile }) => {
  const { theme } = useContext(ThemeContext);
  const { nodes } = useGLTF("/3D/syp-3.gltf");
  const groupRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const model = nodes.Curve;
    const box = new Box3().setFromObject(model);
    const center = box.getCenter(new Vector3());
    model.position.sub(center); // Center the model

    if (groupRef.current) {
      groupRef.current.position.set(0, 0, 0);
    }

    const size = box.getSize(new Vector3()).length();
    const scaleFactor = isMobile ? 7 / size : 10 / size;
    groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

    if (isMobile) return; // Skip mouse listener for mobile

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1; // Adjust Y direction

      if (groupRef.current) {
        groupRef.current.rotation.y = mouseX * Math.PI / 15; // Smooth Y rotation
        groupRef.current.rotation.x = mouseY * Math.PI / 15; // Smooth X rotation
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [nodes, isMobile]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (materialRef.current) {
      const hoverColor = theme === "dark-theme" ? new Color("#6B5154") : new Color("#DA6A2D");
      const normalColor = new Color("#EBE6E0");
      const target = hovered ? hoverColor : normalColor;

      // Smooth color transition
      materialRef.current.color.lerp(target, 0.05);
    }

    if (isMobile && groupRef.current) {
      // Add subtle floating and rotation animation for mobile
      groupRef.current.position.y = 0.09 * Math.sin(elapsedTime * 3);
      groupRef.current.rotation.y += 0.01; // Continuous slow rotation
    }
  });

  return (
    <group ref={groupRef}>
      <mesh {...nodes.Curve}>
        <meshPhysicalMaterial
          ref={materialRef}
          metalness={0}
          transmission={0.9}
          roughness={0}
          chromaticAberration={0.05}
          thickness={0.1}
          ior={1.5}
          envMapIntensity={0.5}
          transparent
        />
      </mesh>
    </group>
  );
};

export default Logo3D;
