import { useState, useRef, useEffect } from 'react';

const CursorTrail = () => {
    const svgRef = useRef(null);
    const hoverRef = useRef(null);
    const pathRef = useRef(null);
    const points = useRef([]);
    const segments = 50;
    const mouse = useRef({ x: 0, y: 0 });
    const [hoveredLink, setHoveredLink] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const initializePoints = () => {
            points.current = Array.from({ length: segments }, () => ({
                x: mouse.current.x,
                y: mouse.current.y,
            }));
        };

        const handleMouseMove = (event) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;

            setCursorPosition({ x: event.clientX, y: event.clientY });

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

    useEffect(() => {
        const handleMouseOver = (event) => {
            if (event.target.tagName.toLowerCase() === 'a') {
                setIsExiting(false)
                setHoveredLink(true);
            }
        };

        const handleMouseOut = (event) => {
            if (event.target.tagName.toLowerCase() === 'a') {
                setHoveredLink(false);
                setIsExiting(true)
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            {/* Cuadrado rojo que sigue al cursor */}
            <div
                className={`cursor__trail--hover cursor__trail--${hoveredLink ? 'hovering' : ''}  cursor__trail--${isExiting ? 'exiting' : ''}`}
                ref={hoverRef}
                style={{
                    transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
                }}
            ></div>

            {/* Cursor Trail */}
            <svg
                ref={svgRef}
                className={`cursor__trail cursor__trail--inverted`}
                style={{ willChange: 'transform' }}
            >
                <path
                    ref={pathRef}
                    className={`cursor__path ${hoveredLink ? 'cursor__path--hovering' : ''}`}
                    d=""
                />
            </svg>
        </>
    );
};

export default CursorTrail;
