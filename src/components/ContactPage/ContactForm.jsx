import { useState } from "react";
import ContactFormInput from "./ContactFormInput";
import ContactFormSelector from "./ContactFormSelector";
import ContactFormSvg from "./ContactFormSvg";
import axios from "axios";
import NewAnimatedButton from "../NewAnimatedButton/NewAnimatedButton";
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const initialFormData = {
    name: "",
    surname: "",
    email: "",
    website: "",
    company: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("contact.form.errors.name")),
    surname: Yup.string().required(t("contact.form.errors.surname")),
    email: Yup.string().email("Invalid email").required(t("contact.form.errors.email")),
    website: Yup.string().notRequired(),
    company: Yup.string().notRequired(),
    message: Yup.string().required(t("contact.form.errors.message")),
    services: Yup.array().required(t("contact.form.errors.services")),
    newOrRedesign: Yup.array().required(t("contact.form.errors.newOrRedesign")),
    deadline: Yup.string().required(t("contact.form.errors.deadline")),
    budget: Yup.string().required(t("contact.form.errors.budget")),
  });

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: initialFormData,
    validationSchema,
    validateOnChange: false,
    onSubmit: values => {
      setLoading(true);

      axios.post("https://photography-port-api.onrender.com/api/send-email", values)
        .then((res) => {
          setSuccess(true);
          setLoading(false)

          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        })
        .catch((err) => console.error("Error sending email:", err))
        .finally(() => setLoading(false))

      // Reset form
      setFormData(initialFormData);

      // Trigger selector reset
      setReset(true);
      setTimeout(() => setReset(false), 0);
    },
  });

  const [reset, setReset] = useState(false); // Resets selectors
  const [focusedField, setFocusedField] = useState(null); // Tracks focused input field
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleInputChange = (field, value) => {
    setFieldValue(field, value)
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  // Render a single input
  const renderInput = (id, name, type, label, value, required = false, error) => (
    <ContactFormInput
      error={error}
      id={id}
      name={name}
      type={type}
      label={t(`contact.form.input.${label}`)}
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
      question: t('contact.form.services.question'),
      key: "services",
      answers: t('contact.form.services.answers', { returnObjects: true }),
      error: errors.services
    },
    {
      question: t('contact.form.newOrRedesign.question'),
      key: "newOrRedesign",
      answers: t('contact.form.newOrRedesign.answers', { returnObjects: true }),
      error: errors.newOrRedesign
    },
    {
      unique: true,
      question: t('contact.form.deadline.question'),
      key: "deadline",
      answers: t('contact.form.deadline.answers', { returnObjects: true }),
      error: errors.deadline
    },
    {
      unique: true,
      question: t('contact.form.budget.question'),
      key: "budget",
      answers: t('contact.form.budget.answers', { returnObjects: true }),
      error: errors.budget
    },
  ];

  return (
    <form
      data-barba="container"
      className="contact__form-container"
      onSubmit={handleSubmit}
    >
      <div className="flex flex--row flex--col-lg flex--j-between d--h-100 g--5">
        {/* About You Section */}
        <div className="contact__form-flex--column g--5">
          <h2 className="text-transform--uppercase text-color--primary h6">{t("contact.form.column1.title")}</h2>
          <div className="d--h-100 flex flex--col flex--j-between">
            <div className="flex flex--row g--2">
              {renderInput("name", "name", "text", "name", values.name, true, errors.name)}
              {renderInput("surname", "surname", "text", "surname", values.surname, true, errors.surname)}
            </div>
            {renderInput("email", "email", "email", "email", values.email, true, errors.email)}
            {renderInput("website", "website", "url", "website", values.website, errors.website)}
            {renderInput("company", "company", "text", "company", values.company, true, errors.company)}

            <div className="contact__form-input-data-area">
              <textarea
                id="message"
                name="message"
                placeholder=""
                value={values.message}
                required
                rows="10"
                onChange={(e) => handleInputChange("message", e.target.value)}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                error={errors.message}
              />
              <label htmlFor="message">{t('contact.form.input.message')}</label>
              {errors.message && <p className="contact__form-input-error">{errors.message}</p>}
            </div>
          </div>
        </div>

        {/* About Your Idea Section */}
        <div className="contact__form-flex--column g--5">
          <h2 className="text-transform--uppercase text-color--primary h6">{t("contact.form.column2.title")}</h2>
          <div className="d--h-100 flex flex--col flex--j-between text-color--primary">
            {selectors.map((selector, index) => (
              <ContactFormSelector
                key={index}
                question={selector.question}
                answers={selector.answers}
                reset={reset}
                unique={selector.unique}
                onChange={(value) => handleInputChange(selector.key, value)}
                errors={selector.error}
              />
            ))}
          </div>
        </div>

        {/* Animated Button and Theme Section */}
        <div className="contact__form-flex--column">
          <div className="flex flex--col flex--a-center flex--j-between d--w-100 d--h-100">
            <div className="contact__form-svg-animation">
              <ContactFormSvg success={success} loading={loading} focusedField={focusedField} />
            </div>
            <div>
              <NewAnimatedButton extraClassNames="submit-button" text={t("contact.form.input.submit")} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
