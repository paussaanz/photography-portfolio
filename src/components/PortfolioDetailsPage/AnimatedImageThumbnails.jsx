// import React from 'react';

// const AnimatedImageThumbnails = ({ imagesArray }) => {
//     return (
//         <div style={{ position: 'absolute', right: '0', top: '0', zIndex: '1000000' }}>
//             <div
//                 // ref={scrollContainerRef}
//                 style={{
//                     height: '100vh',
//                     overflowY: 'scroll',
//                     width: '150px',
//                 }}
//             >
//             <div className="flex flex--wrap flex--j-center flex--a-center">
//             {imagesArray.map((image, index) => (

//                     <img src={image.src} alt={image.alt} className="object-fit--cover" style={{ transition: 'transform 0.3s ease', cursor: 'pointer', height: '150px', width: '150px' }}
//                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
//                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//                     />

//             ))}
// </div>
//         </div>
//         </div>
//     );
// }

// export default AnimatedImageThumbnails;

import { useRef, useEffect, useContext } from 'react';
import LenisContext from '../../contexts/LenisContext';

const AnimatedImageThumbnails = ({ imagesArray }) => {
    const canvasRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const { stop, start } = useContext(LenisContext);

    const squareSize = 150; // Tamaño fijo de las imágenes
    const numSubdivisions = 40; // Número de subdivisiones para una malla más precisa
    const curveIntensity = 10; // Ajusta la intensidad de la curvatura

    const imagePaths = [
        '/images/thumbnails/nature-1.webp',
        '/images/thumbnails/nature-2.webp',
        '/images/thumbnails/nature-3.webp',
        '/images/thumbnails/nature-4.webp',
        '/images/thumbnails/nature-5.webp',
        '/images/thumbnails/nature-6.webp',
        '/images/thumbnails/nature-7.webp',
        '/images/thumbnails/nature-8.webp',
        '/images/thumbnails/nature-9.webp',
        '/images/thumbnails/nature-10.webp',
        '/images/thumbnails/nature-11.webp',
        '/images/thumbnails/nature-12.webp',
        '/images/thumbnails/nature-13.webp',
        '/images/thumbnails/nature-14.webp',
        '/images/thumbnails/nature-15.webp',
        '/images/thumbnails/nature-16.webp',
        '/images/thumbnails/nature-17.webp',
        '/images/thumbnails/nature-18.webp',
        '/images/thumbnails/nature-19.webp',
       
    ];
    // const imagePaths = imagesArray.map((image) => image.src);

    const images = imagePaths.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
    });

    const loopImages = [...images, ...images, ...images];

    useEffect(() => {
        stop();
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

        let lastScrollTop = squareSize * images.length;
        let scrollDirection = 'down';
        let isScrolling = false;
        let curveFactor = 0;
        let lastTimestamp = 0;

        canvas.width = squareSize * devicePixelRatio;
        canvas.height = squareSize * loopImages.length * devicePixelRatio;
        context.scale(devicePixelRatio, devicePixelRatio);

        const drawDeformedImage = (img, yPosition, curveFactor) => {
            const width = squareSize; // Tamaño del cuadrado (200px)
            const height = squareSize; // Tamaño del cuadrado (200px)

            // Calcular proporciones para recorte de la imagen original
            const imgAspectRatio = img.width / img.height;
            const squareAspectRatio = width / height;

            let srcX = 0, srcY = 0, srcWidth = img.width, srcHeight = img.height;

            // Ajustar el recorte según la relación de aspecto
            if (imgAspectRatio > squareAspectRatio) {
                // Imagen más ancha que el cuadrado
                srcWidth = img.height * squareAspectRatio;
                srcX = (img.width - srcWidth) / 2; // Centrar horizontalmente
            } else {
                // Imagen más alta que el cuadrado
                srcHeight = img.width / squareAspectRatio;
                srcY = (img.height - srcHeight) / 2; // Centrar verticalmente
            }

            // Dividir en fragmentos para aplicar curvas
            for (let i = 0; i < numSubdivisions; i++) {
                // Calcular coordenadas del recorte en la imagen
                const fragmentSrcX = srcX + (srcWidth / numSubdivisions) * i;
                const fragmentSrcWidth = srcWidth / numSubdivisions;

                // Calcular coordenadas de destino en el canvas
                const destX = (width / numSubdivisions) * i;
                const destWidth = width / numSubdivisions;

                // Calcular deformación curva
                const curveOffset = curveFactor * curveIntensity * Math.sin((i / numSubdivisions) * Math.PI);
                const adjustedCurveOffset = scrollDirection === 'down' ? curveOffset : -curveOffset;

                // Dibujar cada fragmento de la imagen recortada con deformación curva
                context.drawImage(
                    img,
                    fragmentSrcX, srcY, // Coordenadas de origen del recorte
                    fragmentSrcWidth, srcHeight, // Tamaño del recorte
                    destX, yPosition + adjustedCurveOffset, // Coordenadas de destino
                    destWidth, height // Tamaño del destino
                );
            }
        };


        const drawImages = (curveFactor) => {

            context.clearRect(0, 0, canvas.width, canvas.height);
        
            const visibleStartIndex = Math.max(
                Math.floor(scrollContainerRef.current.scrollTop / squareSize) - 1,
                0
            );
            const visibleEndIndex = Math.min(
                visibleStartIndex + Math.ceil(scrollContainerRef.current.clientHeight / squareSize) + 2,
                loopImages.length
            );
        
            for (let i = visibleStartIndex; i < visibleEndIndex; i++) {
                const img = loopImages[i];
                const yPosition = i * squareSize;
                if (img.complete) {
                    drawDeformedImage(img, yPosition, curveFactor);
                }
            }
        };
        
        let isAnimating = false;

        const handleScroll = (event) => {
            const scrollTop = scrollContainerRef.current.scrollTop;
            const timestamp = event.timeStamp;
            const deltaTime = timestamp - lastTimestamp;
            const scrollDelta = Math.abs(scrollTop - lastScrollTop);

            const scrollSpeed = scrollDelta / deltaTime;
            curveFactor = Math.min(scrollSpeed * 2, 1.1);

            // Determina la dirección del desplazamiento
            scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;
            lastTimestamp = timestamp;

            // drawImages(curveFactor);
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(() => {
                    drawImages(curveFactor);
                    isAnimating = false;
                });
            }

            if (scrollDirection === 'down' && scrollTop >= squareSize * (loopImages.length - (images.length + 3))) {
                loopImages.push(...loopImages.splice(0, images.length));
                scrollContainerRef.current.scrollTop -= squareSize * images.length;

            } else if (scrollDirection === 'up' && scrollTop <= squareSize) {
                loopImages.unshift(...loopImages.splice(-images.length, images.length));
                scrollContainerRef.current.scrollTop += squareSize * images.length;

            }

            console.log(scrollContainerRef.current.scrollTop, "SCROLL")
            // console.log(squareSize * (loopImages.length - images.length), "OTRO")
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                curveFactor = 0;
                drawImages(curveFactor);
            }, 100);
        };

        const scrollContainer = scrollContainerRef.current;
        scrollContainer.addEventListener('scroll', handleScroll);

        const startInteraction = () => stop();

        scrollContainer.addEventListener('pointerenter', startInteraction);
        drawImages(0);
        scrollContainer.scrollTop = squareSize * images.length;

        return () => {
            start();
            scrollContainer.removeEventListener('scroll', handleScroll);
            scrollContainer.removeEventListener('pointerenter', startInteraction);
        };
    }, [stop, start, images, loopImages, squareSize]);

    return (
        <div style={{ position: 'absolute', right: '0', top: '0', zIndex: '1000000' }}>
            <div
                ref={scrollContainerRef}
                style={{
                    height: '100vh',
                    overflowY: 'scroll',
                    width: `${squareSize}px`,
                    margin: '0 auto',
                    position: 'relative',
                    backgroundColor: 'black',
                }}
            >
                <div style={{ height: squareSize * loopImages.length, width: `${squareSize}px` }}>
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: 'sticky',
                            top: 0,
                            width: `${squareSize}px`,
                            height: `${squareSize * loopImages.length}px`,
                        }}
                    ></canvas>
                </div>
            </div>
        </div>
    );
};

export default AnimatedImageThumbnails;
