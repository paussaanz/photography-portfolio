import { useState } from "react";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import ThemeButton from "../General/Buttons/ThemeButton";
import ContactFormInput from "./ContactFormInput";
import ContactFormSelector from "./ContactFormSelector";
import ContactFormSvg from "./ContactFormSvg";

const ContactForm = () => {

    const initialFormData = {
        name: "",
        surname: "",
        email: "",
        website: "",
        company: "",
        message: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [reset, setReset] = useState(false); // Controla el reset de los botones
    const [focusedField, setFocusedField] = useState(null); // Estado para el input enfocado

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFocus = (field) => {
        setFocusedField(field); // Actualiza el input enfocado
    };

    const handleBlur = () => {
        setFocusedField(null); // Limpia el estado al perder el foco
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        setFormData(initialFormData);
        setReset(true);
        setTimeout(() => setReset(false), 0);
    };

    return (
        <form data-barba="container" className="contact__form-container" onSubmit={handleSubmit}>
            <div className="flex flex--row flex--col-mbl flex--j-between d--h-100 g--5">
                <div className="contact__form-flex--column g--5">
                    <h2 className="text-transform--uppercase text-color--primary h6">About You</h2>
                    <div className="d--h-100 flex flex--col flex--j-between">
                        <div className="flex flex--row g--2">
                            <ContactFormInput
                                id="name"
                                name="name"
                                type="text"
                                label="Name"
                                placeholder=""
                                value={formData.name}
                                onChange={(value) => handleInputChange("name", value)}
                                onFocus={() => handleFocus("name")}
                                onBlur={handleBlur}
                                required
                            />
                            <ContactFormInput
                                id="surname"
                                name="surname"
                                type="text"
                                label="Surname"
                                placeholder=""
                                value={formData.surname}
                                onChange={(value) => handleInputChange("surname", value)}
                                onFocus={() => handleFocus("surname")}
                                onBlur={handleBlur}
                                required
                            />
                        </div>
                        <ContactFormInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder=""
                            value={formData.email}
                            onChange={(value) => handleInputChange("email", value)}
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                            required
                        />
                        <ContactFormInput
                            id="website"
                            name="website"
                            type="url"
                            label="Current website"
                            placeholder=""
                            value={formData.website}
                            onChange={(value) => handleInputChange("website", value)}
                            onFocus={() => handleFocus("website")}
                            onBlur={handleBlur}
                        />
                        <ContactFormInput
                            id="company"
                            name="company"
                            type="text"
                            label="Company name"
                            placeholder=""
                            value={formData.company}
                            onChange={(value) => handleInputChange("company", value)}
                            onFocus={() => handleFocus("company")}
                            onBlur={handleBlur}
                            required
                        />

                        <div className="contact__form-input-data-area">
                            <textarea
                                id="message"
                                name="message"
                                placeholder=""
                                value={formData.message} // Current value for the "Message" textarea
                                required
                                rows="10"
                                onChange={(e) => handleInputChange("message", e.target.value)}
                                onFocus={() => handleFocus("message")}
                                onBlur={handleBlur}
                            />
                            <label htmlFor="message">Message</label>
                        </div>
                    </div>

                </div>
                <div className="contact__form-flex--column  g--5">
                    <h2 className="text-transform--uppercase text-color--primary h6">About your idea</h2>
                    <div className="d--h-100 flex flex--col flex--j-between">
                        <ContactFormSelector question={"what services are you interested in?"}
                            reset={reset}
                        />
                        <ContactFormSelector question={"is it a new website or a rebuild?"}
                            reset={reset}
                        />
                        <ContactFormSelector question={"when should it be ready?"}
                            reset={reset}
                        />
                        <ContactFormSelector question={"what's your budget?"}
                            reset={reset}
                        />
                    </div>

                </div>
                <div className="contact__form-flex--column">
                    <div className="flex flex--col flex--a-center flex--j-between d--w-100 d--h-100">
                        <div className="contact__form-svg-animation">

                        <ContactFormSvg focusedField={focusedField} />
                        </div>
                        <AnimatedButton
                            text="Submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>

                <ThemeButton />

            </div>
        </form>
    );
};

export default ContactForm;