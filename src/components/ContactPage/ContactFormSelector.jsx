import { useEffect, useState } from "react";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const ContactFormSelector = ({ question, answers, reset }) => {
    const [selectedButtons, setSelectedButtons] = useState([]);

    useEffect(() => {
        if (reset) {
            setSelectedButtons([]); // Limpia la selección cuando `reset` cambia
        }
    }, [reset]);

    const handleButtonClick = (button) => {
        setSelectedButtons((prev) => {
            if (prev.includes(button)) {
                return prev.filter((b) => b !== button);
            } else {
                return [...prev, button];
            }
        });
    };

    return (
        <div className="flex flex--col">
            <h3 className="text-transform--uppercase b6 m--b-4">{question}</h3>
            <div className="flex flex--wrap g--2">
                {answers.map((answer) => (
                    <AnimatedButton
                        key={answer} // Use a unique key for each button
                        width={210}
                        text={answer} // Use the current answer as the button text
                        onClick={() => handleButtonClick(answer)} // Pass the answer to handleButtonClick
                        isSelected={selectedButtons.includes(answer)} // Check if the answer is selected
                    />
                ))}
            </div>
        </div>
    );
};

export default ContactFormSelector;