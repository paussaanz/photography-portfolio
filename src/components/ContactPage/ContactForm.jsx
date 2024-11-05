import AnimatedButton from "../AnimatedButton/AnimatedButton";
import CursorNew from "../Cursor/CursorTrail";
import ThemeButton from "../General/Buttons/ThemeButton";
import ContactFormSelector from "./ContactFormSelector";

const ContactForm = () => {
    return (
        <div data-barba="container" className="contact__form-container">
            <div className="flex flex--row flex--j-between d--h-100 g--5">
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
                <div className="contact__form-flex--column flex--a-center">
                    {/* <img src="/images/nature-1.jpg" className="d--w-100 d--h-100 object-fit--cover"/> */}
                    <AnimatedButton text="Submit" />

                </div>

            </div>
        </div>
    );
};

export default ContactForm;