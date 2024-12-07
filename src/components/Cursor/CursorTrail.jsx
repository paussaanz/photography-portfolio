import { useRef, useEffect } from 'react';

const CursorTrail = () => {
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const points = useRef([]);
    const segments = 50;
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

            if (points.current.length > 0) {
                pathRef.current && pathRef.current.setAttribute('d', `M ${points.current.map(p => `${p.x} ${p.y}`).join(' L ')}`);
            }

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <svg ref={svgRef} className="cursor__trail cursor__trail--inverted"
            style={{ willChange: 'transform' }}>
            <path ref={pathRef} className="cursor__path" d="" />
        </svg>
    );
};

export default CursorTrail;

