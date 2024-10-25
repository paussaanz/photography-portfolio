import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const circleContainerRef = useRef(null);

    useEffect(() => {
        function cursor() {
            const circles = Array.from(circleContainerRef.current.querySelectorAll(".circle"));
            const coords = { x: 0, y: 0 };
            let lastPositions = circles.map(() => ({ x: 0, y: 0 }));

            const colors = [
                "#4C4C4C", // Gris oscuro
                "#5C5C5C", // Un poco más claro
                "#6C6C6C", // Gris
                "#7C7C7C", // Gris medio
                "#8C8C8C", // Gris medio claro
                "#9C9C9C", // Claro
                "#ACACAC", // Más claro
                "#BCBCBC", // Muy claro
                "#CCCCCC", // Gris suave
                "#DCDCDC", // Gris casi blanco
                "#EDEDED"  // Gris muy claro
            ]

                ;


            circles.forEach((circle, index) => {
                circle.style.backgroundColor = colors[index % colors.length];
                circle.style.zIndex = circles.length - index; // Set z-index based on size initially
            });

            window.addEventListener("mousemove", (e) => {
                coords.x = e.clientX;
                coords.y = e.clientY;
            });

            function animatedCircles() {


                circles.forEach((circle, index) => {
                    const followSpeed = 0.4;

                    if (index === 0) {
                        lastPositions[index].x += (coords.x - lastPositions[index].x) * followSpeed;
                        lastPositions[index].y += (coords.y - lastPositions[index].y) * followSpeed;
                    } else {
                        lastPositions[index].x += (lastPositions[index - 1].x - lastPositions[index].x) * followSpeed;
                        lastPositions[index].y += (lastPositions[index - 1].y - lastPositions[index].y) * followSpeed;
                    }

                    circle.style.left = `${lastPositions[index].x - 12}px`;
                    circle.style.top = `${lastPositions[index].y - 12}px`;
                    circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
                    circle.style.zIndex = 2000 - index;

                });
                requestAnimationFrame(animatedCircles)
            }

            animatedCircles();
        }

        if (circleContainerRef.current) {
            cursor();
        }

        return () => {
            window.removeEventListener("mousemove", cursor);
        };
    }, [])

    return (
        <div ref={circleContainerRef} className="custom-cursor-container">
            {new Array(20).fill().map((_, index) => (
                <div key={index} className='circle'></div>
            ))}
        </div>
    );
};

export default Cursor;
