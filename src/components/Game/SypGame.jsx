import { useEffect, useRef, useState } from "react";
import ObstacleGame from "./obstacle/ObstacleGame";

const GRAVITY = -1;
const JUMP_VELOCITY = 15;
const FRAME_RATE = 1000 / 60; // 60 FPS

const SypGame = () => {
    const dinoRef = useRef(null);
    const [bottom, setBottom] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [hasJumped, setHasJumped] = useState(false);
    const [time, setTime] = useState(0);
    const gameLoopRef = useRef(null);
    const timerRef = useRef(null);
    const [enemies, setEnemies] = useState([])


    const handleKeyDown = (e) => {
        if ((e.key === "ArrowUp" || e.key === " ") && !isJumping) {
            setIsJumping(true);
            setVelocity(JUMP_VELOCITY);
            if (!hasJumped) {
                setHasJumped(true);
                timerRef.current = setInterval(() => {
                    setTime((prevTime) => prevTime + 1);
                }, 100);
            }
        }
    };

    useEffect(() => {
        const gameLoop = () => {
            setBottom((prevBottom) => {
                const newBottom = prevBottom + velocity;
                if (newBottom <= 0) {
                    setIsJumping(false);
                    setVelocity(0);
                    return 0;
                }
                return newBottom;
            });
            setVelocity((prevVelocity) => prevVelocity + GRAVITY);
        };


        if (!gameLoopRef.current) {
            gameLoopRef.current = setInterval(gameLoop, FRAME_RATE);
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
                gameLoopRef.current = null;
            }
        };
    }, [velocity]);

    const formatTime = (time) => {
        return time.toString().padStart(4, "0"); // Ensures 4 digits with leading zeros
    };

    const addObstacles = () => {
        const randomN = Math.floor(Math.random() * 3 + 1)
        console.log(randomN)
        setEnemies((prev) => {
            return [...prev, <ObstacleGame num={randomN} key={Math.random()}/>]
        })
    }


    useEffect(() => {
        setInterval(() => {
            addObstacles()
        }, 3000)
    }, [])



    useEffect(() => {
   
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isJumping]);

    return (
        <div className="game__container flex flex--a-center flex--j-center">
            <div className="game__board">
                <div
                    ref={dinoRef}
                    className="game__dino"
                    style={{ bottom: `${bottom}px` }}
                ></div>
                <div className="game__counter" style={{ position: "absolute", top: "10px", right: "10px", fontSize: "20px", fontWeight: "bold" }}>
                    {formatTime(time)}
                </div>
                {enemies.map(Enem => {
                    return Enem
                })}
            </div>
        </div>
    );
};

export default SypGame;
