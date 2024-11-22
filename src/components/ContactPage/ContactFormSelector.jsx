import { useEffect, useState } from "react";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const ContactFormSelector = ({ question, reset }) => {
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
            <h3 className="text-transform--uppercase b6 m--b-3">{question}</h3>
            <div className="flex flex--wrap g--2">
                <AnimatedButton width={130} text="Branding"
                    onClick={() => handleButtonClick("Option 1")}
                    isSelected={selectedButtons.includes("Option 1")}
                />
                <AnimatedButton width={180} text="Webdesign"
                    onClick={() => handleButtonClick("Option 2")}
                    isSelected={selectedButtons.includes("Option 2")}
                />
                <AnimatedButton text="Submit"
                    onClick={() => handleButtonClick("Option 3")}
                    isSelected={selectedButtons.includes("Option 3")}
                />
                <AnimatedButton text="Submit"
                    onClick={() => handleButtonClick("Option 4")}
                    isSelected={selectedButtons.includes("Option 4")}
                />
            </div>
        </div>
    );
};

export default ContactFormSelector;