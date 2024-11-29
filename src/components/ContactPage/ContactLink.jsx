const ContactLink = ({ text, logoClass, logoSize, href, isMobile }) => {
    return (
        <a href={href} target="_blank" className="contact__link">
            {!isMobile && <span className={`contact__logo-circle ${logoClass} ${logoSize}`} />}
            <span className={`contact__name ${isMobile? "h6": "h5"} text-transform--uppercase`}>{text}</span>
            {isMobile && <span className={`contact__logo-circle icon-arrow b6`} />}
        </a>
    );
};

export default ContactLink;