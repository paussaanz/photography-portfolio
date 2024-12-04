const ContactLink = ({ text, logoClass, logoSize = "h5", href, isMobile }) => {
    const renderLogo = !isMobile ? (
      <span className={`contact__logo-circle ${logoClass} ${logoSize}`} />
    ) : (
      <span className="contact__logo-circle icon-arrow b6" />
    );
  
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="contact__link">
        {!isMobile && renderLogo}
        <span className={`contact__name ${isMobile ? "h6" : "h5"} text-transform--uppercase`}>
          {text}
        </span>
        {isMobile && renderLogo}
      </a>
    );
  };
  
  export default ContactLink;
  