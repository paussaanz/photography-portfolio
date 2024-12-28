import { useEffect, useState } from "react";
import NewAnimatedButton from "../NewAnimatedButton/NewAnimatedButton";

const ContactFormSelector = ({ question, answers, reset, onChange, unique, errors }) => {
    const [selectedButtons, setSelectedButtons] = useState([]);

    useEffect(() => {
        if (reset) {
            setSelectedButtons([]); // Limpia la selección cuando `reset` cambia
        }
    }, [reset]);


    const handleButtonClick = (button) => {
        if (unique) {
            setSelectedButtons((prev) => {
                if (prev.includes(button)) {
                    onChange("");
                    return [];
                } else {
                    onChange(button);
                    return [button];
                }
            });
        } else {
            setSelectedButtons((prev) => {
                if (prev.includes(button)) {
                    onChange(prev.filter((b) => b !== button));
                    return prev.filter((b) => b !== button);
                } else {
                    onChange([...prev, button]);
                    return [...prev, button];
                }
            });
        }
    };

    const groupByPairs = (array) => {
        const grouped = [];
        for (let i = 0; i < array.length; i += 2) {
            grouped.push(array.slice(i, i + 2));
        }
        return grouped;
    };

    const groupedAnswers = groupByPairs(answers); // Agrupamos respuestas en pares

    return (
        <div className="flex flex--col selector-area">
            <div className="m--b-2">
                <h3 className="text-transform--uppercase b6">{question}</h3>
                {errors && <p className="contact__form-input-error">{errors}</p>}
            </div>
            <div className="flex flex--wrap g--2">
                {groupedAnswers.map((group, index) => (
                    <div className="flex g--2 d--w-100" key={index}>
                        {group.map((answer) => (
                            <NewAnimatedButton
                                key={answer}
                                text={answer}
                                onClick={() => handleButtonClick(answer)}
                                isSelected={selectedButtons.includes(answer)}
                            />

                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactFormSelector;
