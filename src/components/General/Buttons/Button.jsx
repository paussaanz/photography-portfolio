import { useEffect, useRef } from "react";

const Button = ({ text, className, onClick }) => {
    const buttonRef = useRef(null);
    const originalText = useRef(text);

    useEffect(() => {
        const button = buttonRef.current;
        button.addEventListener('mouseenter', shuffleAnimation);
        button.addEventListener('mouseleave', resetText);

        function getRandomCharacter() {
            const chars = "0123456789";
            return chars[Math.floor(Math.random() * chars.length)];
        }

        function shuffleAnimation() {
            if (button.dataset.animating === 'true') {
                return;
            }
            button.dataset.animating = 'true';

            let textArray = originalText.current.split('');
            const interval = setInterval(() => {
                // Only shuffle non-space characters
                textArray = textArray.map(char => char === ' ' ? ' ' : getRandomCharacter());
                button.textContent = textArray.join('');
            }, 90);

            setTimeout(() => {
                clearInterval(interval);
                resetText();
            }, 600); // Runs the animation for 500ms
        }

        function resetText() {
            button.textContent = originalText.current;
            button.dataset.animating = 'false';
        }

        return () => {
            button.removeEventListener('mouseenter', shuffleAnimation);
            button.removeEventListener('mouseleave', resetText);
        };
    }, [text]);

    return (
        <button
            ref={buttonRef}
            className={`b6 text-transform--uppercase text-decoration--none ${className}`}
            onClick={onClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
            {text}
        </button>
    );
};

export default Button;
