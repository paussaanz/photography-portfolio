const ContactLink = ({ text, logoClass, fontSize, href }) => {
    return (
        <a href={href} target="_blank" className="contact__link">
                <span className={`contact__logo-circle ${logoClass} ${fontSize}`} />
            <span className={`contact__name ${fontSize} text-transform--uppercase`}>{text}</span>
        </a>
    );
};

export default ContactLink;