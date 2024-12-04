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
  const [reset, setReset] = useState(false); // Resets selectors
  const [focusedField, setFocusedField] = useState(null); // Tracks focused input field

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    // Reset form
    setFormData(initialFormData);

    // Trigger selector reset
    setReset(true);
    setTimeout(() => setReset(false), 0);
  };

  // Render a single input
  const renderInput = (id, name, type, label, value, required = false) => (
    <ContactFormInput
      id={id}
      name={name}
      type={type}
      label={label}
      placeholder=""
      value={value}
      onChange={(value) => handleInputChange(name, value)}
      onFocus={() => handleFocus(name)}
      onBlur={handleBlur}
      required={required}
    />
  );

  // Questions and answers for selectors
  const selectors = [
    {
      question: "What services are you interested in?",
      answers: ["WebDesign", "WebDevelopment", "E-commerce", "Maintenance"],
    },
    {
      question: "Is it a new website or a rebuild?",
      answers: ["New", "Redesign", "Partial", "Updates"],
    },
    {
      question: "When should it be ready?",
      answers: ["ASAP", "1-2 months", "3–6 months", "Flexible"],
    },
    {
      question: "What's your budget?",
      answers: ["<$1K", "$1K–$5K", "$5K–$10K", "$10K+"],
    },
  ];

  return (
    <form
      data-barba="container"
      className="contact__form-container"
      onSubmit={handleSubmit}
    >
      <div className="flex flex--row flex--col-mbl flex--j-between d--h-100 g--5">
        {/* About You Section */}
        <div className="contact__form-flex--column g--5">
          <h2 className="text-transform--uppercase text-color--primary h6">About You</h2>
          <div className="d--h-100 flex flex--col flex--j-between">
            <div className="flex flex--row g--2">
              {renderInput("name", "name", "text", "Name", formData.name, true)}
              {renderInput("surname", "surname", "text", "Surname", formData.surname, true)}
            </div>
            {renderInput("email", "email", "email", "Email", formData.email, true)}
            {renderInput("website", "website", "url", "Current Website", formData.website)}
            {renderInput("company", "company", "text", "Company Name", formData.company, true)}

            <div className="contact__form-input-data-area">
              <textarea
                id="message"
                name="message"
                placeholder=""
                value={formData.message}
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

        {/* About Your Idea Section */}
        <div className="contact__form-flex--column g--5">
          <h2 className="text-transform--uppercase text-color--primary h6">About Your Idea</h2>
          <div className="d--h-100 flex flex--col flex--j-between">
            {selectors.map((selector, index) => (
              <ContactFormSelector
                key={index}
                question={selector.question}
                answers={selector.answers}
                reset={reset}
              />
            ))}
          </div>
        </div>

        {/* Animated Button and Theme Section */}
        <div className="contact__form-flex--column">
          <div className="flex flex--col flex--a-center flex--j-between d--w-100 d--h-100">
            <div className="contact__form-svg-animation">
              <ContactFormSvg focusedField={focusedField} />
            </div>
            <AnimatedButton text="Submit" onClick={handleSubmit} />
          </div>
        </div>

        {/* Theme Toggle */}
        <ThemeButton />
      </div>
    </form>
  );
};

export default ContactForm;
