// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Make sure to import the right controls
// import { MeshTransmissionMaterial } from "@react-three/drei"; // Import MeshTransmissionMaterial

// const Logo3D = () => {
//     const mountRef = useRef(null);


//     useEffect(() => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ antialias: true });

//         renderer.setSize(window.innerWidth, window.innerHeight);
//         mountRef.current.appendChild(renderer.domElement);

//         const controls = new OrbitControls(camera, renderer.domElement);

//         // Ambient and directional light
//         const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 5, 5).normalize();
//         scene.add(directionalLight);

//         // Set background color to white
//         scene.background = new THREE.Color(0xffffff);

//         const loader = new GLTFLoader();
//         const dracoLoader = new DRACOLoader();
//         dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
//         loader.setDRACOLoader(dracoLoader);

//         loader.load(
//             '/3D/logo-web-3d-face-compression.gltf',
//             (gltf) => {
//                 const logo = gltf.scene;


//                 // Use traverse to assign the MeshTransmissionMaterial
//                 logo.traverse((child) => {
//                     if (child.isMesh) {
//                         child.material = new MeshTransmissionMaterial({
//                             color: 0xff0000, // Assign a red color to the model
//                             thickness: 0.2, // Set thickness for glass-like effect
//                             roughness: 0.0, // Low roughness for clear glass
//                             transmission: 1.0, // Full transmission for glass
//                             ior: 1.2, // Index of refraction for glass
//                             chromaticAberration: 0.02, // Adjust chromatic aberration
//                             backside: true, // Render backside for a glass effect
//                         });
//                     }
//                 });

//                 scene.add(logo);

//                 const animate = () => {
//                     requestAnimationFrame(animate);
//                     controls.update();
//                     renderer.render(scene, camera);
//                 };

//                 animate(); // Start animation
//             },
//             undefined,
//             (error) => {
//                 console.error('An error occurred while loading the GLTF logo', error);
//             }
//         );

//         camera.position.z = 5;

//         return () => {
//             mountRef.current.removeChild(renderer.domElement);
//         };
//     }, []); // Update effect when material properties change

//     return (
//            <primitive object={gltf.scene} /> 
//     );
// };

// export default Logo3D;
