import { useRef, useEffect } from 'react';

const CursorTrail = () => {
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const points = useRef([]);
    const segments = 100;
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Initialize points to prevent empty array issues
        const initializePoints = () => {
            points.current = Array.from({ length: segments }, () => ({
                x: mouse.current.x,
                y: mouse.current.y,
            }));
        };

        // Handle mouse movement to update mouse position
        const handleMouseMove = (event) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;

            if (points.current.length === 0) {
                initializePoints();
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const svg = svgRef.current;
            const ww = window.innerWidth;
            const wh = window.innerHeight;

            svg.style.width = `${ww}px`;
            svg.style.height = `${wh}px`;
            svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const animate = () => {
            let px = mouse.current.x;
            let py = mouse.current.y;

            points.current.forEach((p, index) => {
                p.x = px;
                p.y = py;

                const next = points.current[index + 1];
                if (next) {
                    px -= (p.x - next.x) * 0.5;
                    py -= (p.y - next.y) * 0.5;
                }
            });

            pathRef.current.setAttribute('d', `M ${points.current.map(p => `${p.x} ${p.y}`).join(' L ')}`);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <svg ref={svgRef} className="cursor__trail">
            <path ref={pathRef} className="cursor__path" d="" />
        </svg>
    );
};

export default CursorTrail;  

     
// import React, { useRef, useEffect, useState } from 'react';

// const CursorNew = () => {
//     const svgRef = useRef(null);
//     const [points, setPoints] = useState([]); 
//     const ww = window.innerWidth
//     const wh = window.innerHeight;

//     useEffect(() => {
//         const move = (e) => {
//             const newPoint = { x: e.clientX, y: e.clientY };
//             setPoints(prevPoints => [...prevPoints, newPoint]);
//         };

//         document.addEventListener("mousemove", move);

//         return () => {
//             document.removeEventListener("mousemove", move);
//         };
//     }, []);

//     useEffect(() => {
//         const path = svgRef.current.querySelector('.cursor__path');
//         if (path) {
//             path.setAttribute("d", `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`);
//         }
//     }, [points]);

//     useEffect(() => {
//         svgRef.current.style.width= ww + "px";
//         svgRef.current.style.height= wh + "px";
//         if(svgRef.current){
//             svgRef.current.setAttribute("viewBox", `0 0 ${ww} ${wh}`)
//         }
//     }, [ww, wh]);

//     return (
//         <svg ref={svgRef} className="cursor__trail" viewBox="0 0 400 400">
//             <path className="cursor__path" d="M 100 100 L 200 200 L 300 100" />
//         </svg>
//     );
// };

// export default CursorNew;