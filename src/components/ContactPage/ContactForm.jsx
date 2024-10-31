import AnimatedButton from "../AnimatedButton/AnimatedButton";
import ContactFormSelector from "./ContactFormSelector";

const ContactForm = () => {
    return (
        <div data-barba="container" className="contact__form-container">
            <div className="flex flex--row d--vw-100 flex--j-between d--h-100">
                <div className="contact__form-flex--column">
                    <h2 className="text-transform--uppercase text-color--primary h6">About You</h2>

                </div>
                <div className="contact__form-flex--column  g--3">
                    <h2 className="text-transform--uppercase text-color--primary h6">About your idea</h2>
                    <div className="d--h-100 flex flex--col flex--j-around">
                        <ContactFormSelector question={"what services are you interested in?"} />
                        <ContactFormSelector question={"is it a new website or a rebuild?"} />
                        <ContactFormSelector question={"when should it be ready?"} />
                        <ContactFormSelector question={"what's your budget?"} />
                    </div>

                </div>
                <div className="contact__form-flex--column">
                    <AnimatedButton text="Submit" />

                </div>
            </div>
        </div>
    );
};

export default ContactForm;