import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const Logo3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement)
        //LUZ AMBIENTE Y DIRECTA
        const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // soft light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        const background = new THREE.Color(0xffffff);
        scene.background = background;

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            '/3D/logo-web-3d-face-compression.gltf',
            (gltf) => {

                const logo = gltf.scene;

                // Añadir brillo al material del modelo
                logo.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xff0000, // Assign a red color to the model
                            roughness: 0.0, // Very low roughness for clear glass
                            metalness: 0.0, // Non-metallic
                            transparent: true, // Enable transparency
                            opacity: 0.5, // Set the opacity (0 = fully transparent, 1 = fully opaque)
                            transmission: 1.0, // Full transmission for glass
                            ior: 1.5, // Index of refraction for glass
                            clearcoat: 1.0, // Add a clear coat for extra shininess
                            clearcoatRoughness: 0.1, // Roughness of the clear coat
                        });
                    }
                });

                scene.add(logo);

                const animate = () => {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                };

                animate(); // Iniciar animación



            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the GLTF logo', error);
            }
        );

        camera.position.z = 5;



        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);


    return (
        <div ref={mountRef}>

        </div>
    );
};

export default Logo3D;
