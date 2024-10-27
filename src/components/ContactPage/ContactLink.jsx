const ContactLink = ({ text, logoClass, fontSize }) => {
    return (
        <div className="contact__link">
            <div className={`contact__logo-circle contact__logo-circle--${logoClass}`}></div>
            <span className={`contact__name ${fontSize} text-transform--uppercase`}>{text}</span>
        </div>
    );
};

export default ContactLink;
