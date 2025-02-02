import React, { useEffect, useRef } from 'react';

const ObstacleGame = ({num}) => {
    const obstacles = Array.from({ length: num }, (_, index) => index + 1);
    const divRef = useRef(null)
    console.log('obstacles', obstacles)

    useEffect(() => {
        if (divRef) {
            // can move
        }
    })

    return (
        <div className="game__obstacle-container" style={{ right: 0 }}>
            {obstacles.map((_, i) => {
                return (
                    <div className="game__obstacle">
                    </div>
                )
            })}
        </div>
    );
};

export default ObstacleGame;