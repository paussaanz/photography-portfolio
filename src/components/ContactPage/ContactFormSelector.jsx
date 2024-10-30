import AnimatedButton from "../AnimatedButton/AnimatedButton";

const ContactFormSelector = ({question}) => {
    return (
        <div className="flex--display flex--column">
            <h3 className="text-transform--uppercase fs-6 margin--bottom-2">{question}</h3>
            <div className="gap--2 flex--display flex--wrap">
                <AnimatedButton width={130} text="Branding" />
                <AnimatedButton width={180} text="Webdesign" />
                <AnimatedButton text="Submit" />
                <AnimatedButton text="Submit" />
            </div>
        </div>
    );
};

export default ContactFormSelector;