import AnimatedButton from "../AnimatedButton/AnimatedButton";

const ContactFormSelector = ({question}) => {
    return (
        <div className="flex flex--col">
            <h3 className="text-transform--uppercase fs-6 m--b-2">{question}</h3>
            <div className="flex flex--wrap g--2">
                <AnimatedButton width={130} text="Branding" />
                <AnimatedButton width={180} text="Webdesign" />
                <AnimatedButton text="Submit" />
                <AnimatedButton text="Submit" />
            </div>
        </div>
    );
};

export default ContactFormSelector;