import { useRef, useEffect, useContext } from 'react';
import LenisContext from '../../contexts/LenisContext';

const AnimatedImageThumbnails = () => {
    const canvasRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const { stop, start } = useContext(LenisContext);

    const squareSize = 150;
    const numSubdivisions = 50; // Número de subdivisiones para una malla más precisa
    const curveIntensity = 10; // Ajusta la intensidad de la curvatura

    const imagePaths = [
        '/images/lifestyle-1.jpg',
        '/images/lifestyle-2.jpg',
        '/images/lifestyle-3.jpg',
        '/images/lifestyle-4.jpg',
        '/images/lifestyle-5.jpg'
    ];

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
        let lastScrollTop = squareSize * images.length;
        let scrollDirection = 'down';
        let isScrolling = false;
        let curveFactor = 0;
        let lastTimestamp = 0;

        canvas.width = squareSize;
        canvas.height = squareSize * loopImages.length;

        const drawDeformedImage = (img, yPosition, curveFactor) => {
            const width = squareSize;
            const height = squareSize;
            const imageWidth = img.width;
            const imageHeight = img.height;

            // Asegura que el ancho escalado esté en proporción con las subdivisiones
            const scaledWidth = width * 1.2;
            const scaledHeight = height * 1.2;

            for (let i = 0; i < numSubdivisions; i++) {
                const srcX = (imageWidth / numSubdivisions) * i;
                const srcWidth = imageWidth / numSubdivisions;

                // Calcula las coordenadas de destino en el canvas
                const destX = (width / numSubdivisions) * i;
                const destWidth = width / numSubdivisions;

                // Calcula el desplazamiento de la curva y ajusta en base a la dirección
                const curveOffset = curveFactor * curveIntensity * Math.sin((i / numSubdivisions) * Math.PI);
                const adjustedCurveOffset = scrollDirection === 'down' ? curveOffset : -curveOffset;

                // Dibujar cada fragmento de la imagen distorsionada
                context.drawImage(
                    img,
                    srcX, 0,
                    srcWidth, imageHeight,
                    destX, yPosition + adjustedCurveOffset,
                    destWidth, scaledHeight
                );
            }
        };

        const drawImages = (curveFactor) => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            loopImages.forEach((img, index) => {
                const yPosition = index * squareSize;
                if (img.complete) {
                    drawDeformedImage(img, yPosition, curveFactor);
                }
            });
        };

        const handleScroll = (event) => {
            const scrollTop = scrollContainerRef.current.scrollTop;
            const timestamp = event.timeStamp;
            const deltaTime = timestamp - lastTimestamp;
            const scrollDelta = Math.abs(scrollTop - lastScrollTop);

            const scrollSpeed = scrollDelta / deltaTime;
            curveFactor = Math.min(scrollSpeed * 5, 1.1);

            // Determina la dirección del desplazamiento
            scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;
            lastTimestamp = timestamp;

            drawImages(curveFactor);

            if (scrollDirection === 'down' && scrollTop >= squareSize * (loopImages.length - images.length)) {
                loopImages.push(...loopImages.splice(0, images.length));
                scrollContainerRef.current.scrollTop -= squareSize * images.length;
                drawImages(curveFactor);
            } else if (scrollDirection === 'up' && scrollTop <= squareSize) {
                loopImages.unshift(...loopImages.splice(-images.length, images.length));
                scrollContainerRef.current.scrollTop += squareSize * images.length;
                drawImages(curveFactor);
            }

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
