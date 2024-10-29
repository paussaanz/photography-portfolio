import { useEffect, useState } from "react";

const CursorHover = ({visible}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return visible ? (
        <div className="custom-cursor-hover" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        </div>
    ) : null;
};

export default CursorHover;