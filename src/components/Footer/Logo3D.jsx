import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from 'three'; // Asegúrate de importar THREE

const Logo3D = () => {
    const { nodes } = useGLTF("/3D/logo-web-3d-face-compression.gltf");
    const { viewport } = useThree();
    const groupRef = useRef(null); // Ref para el grupo de la escena
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-10 * aspect, 10 * aspect, 10, -10, 0.1, 1000);

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 1.5, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 1, min: 0, max: 1 },
    });

    useEffect(() => {
        // Calcular la caja delimitadora del modelo para centrarlo
        const model = nodes.Curve001; // Asegúrate de que este sea el modelo correcto
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3()); // Obtener el centro de la caja delimitadora
        model.position.sub(center); // Ajustar la posición del modelo para centrarlo

        // Establecer la posición del grupo para que esté centrado
        if (groupRef.current) {
            groupRef.current.position.set(0, 0, 0); // Asegúrate de que el grupo esté en el origen
        }

        //Escalar el objeto 3D
        const size = box.getSize(new THREE.Vector3()).length(); // Get the size of the bounding box
        const scaleFactor = 20 / size; // Adjust this factor to set the desired size
        groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor); // Apply uniform scaling


        // Configurar la cámara ortográfica para vista isométrica
        camera.position.set(20, 20, 20); // Posición de la cámara
        camera.lookAt(0, 0, 0); // Mirar hacia el centro de la escena

        const onMouseMove = (event) => {
            // Calcular la posición normalizada del ratón (-1 a 1)
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalizado a [-1, 1]

            // Controlar la rotación del modelo (solo en el eje Y)
            if (groupRef.current) {
                groupRef.current.rotation.y = mouseX * Math.PI; // Gira 180 grados basado en la posición del ratón
            }
        };

        // Añadir el evento de movimiento del ratón
        window.addEventListener("mousemove", onMouseMove);

        // Limpiar el evento cuando se desmonta el componente
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [camera, nodes]); // Asegúrate de incluir nodes como dependencia

    return (
        <group ref={groupRef} scale={viewport.width / 3.5}>
            {/* <Text fontSize={68} position={[0, 0, -35]}>
                .SYP
            </Text> */}
            <mesh {...nodes.Curve001}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    );
};

export default Logo3D;
