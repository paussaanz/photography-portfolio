import AnimatedButton from "../AnimatedButton/AnimatedButton";
import ContactFormSelector from "./ContactFormSelector";

const ContactForm = () => {
    return (
        <div data-barba="container" className="contact-form-page background--light dimension--vh-100">
            <div className="flex--display flex--row dimension--vw-100 flex--justify-between">
                <div className="flex--column-form">
                    <h2 className="text-transform--uppercase text-color--primary h6">About You</h2>

                </div>
                <div className="flex--column-form  gap--3">
                    <h2 className="text-transform--uppercase text-color--primary h6">About your idea</h2>
                    <div className="flex--display flex--column flex--justify-between">
                        <ContactFormSelector question={"what services are you interested in?"} />
                        <ContactFormSelector question={"is it a new website or a rebuild?"} />
                        <ContactFormSelector question={"when should it be ready?"} />
                        <ContactFormSelector question={"what's your budget?"} />
                    </div>

                </div>
                <div className="flex--column-form">
                    <AnimatedButton text="Submit" />

                </div>
            </div>
        </div>
    );
};

export default ContactForm;