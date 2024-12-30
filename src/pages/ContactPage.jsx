import { useEffect, useState } from "react";
import ContactLink from "../components/ContactPage/ContactLink";
import Scene3DContact from "../components/ContactPage/Scene3DContact";
import TextOverlay from "../components/General/TextOverlay";
import ContactPageSeo from "./SEO/ContactPageSeo";
import CursorHover from "../components/Cursor/CursorHover";
import { useMediaQuery } from "../contexts/MediaQueryContext";
import { contactLinks } from "../assets/js/images";
import { useTransition } from "../contexts/transitionContext";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const [hovered, setHovered] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const { isMobile } = useMediaQuery();
  const [activeIndex, setActiveIndex] = useState(-1);
  const { handleLinkClick } = useTransition()
  const { t } = useTranslation();

  const text = t("contact.animatedText.mobile")

  // Flashing letter animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * text.length);
      setActiveIndex(randomIndex);

      setTimeout(() => {
        setActiveIndex(-1);
      }, 300); // Reset the active letter after 300ms
    }, 1000); // Trigger the animation every 1000ms

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [text]);

  const renderTextWithAnimation = (text) =>
    text.split("").map((char, index) => (
      <span
        key={index}
        style={{
          color:
            index === activeIndex ? "var(--cor-secondary)" : "var(--cor-primary)",
        }}
      >
        {char}
      </span>
    ));

  return (
    <div data-barba="container">
      <ContactPageSeo />

      {!isMobile && <CursorHover visible={cursorVisible} />}

      <section className="contact__section-hero container-bem-mbl d--vh-100">
        <div className="d--vh-100 flex flex--col">
          {isMobile ? (
            <>
              <div className="contact__intro-mbl p--t-6-mbl">
                <h1 className="contact__title-mbl p--b-3">
                  {renderTextWithAnimation(text)}
                </h1>
                <p className="contact__text-mbl text-transform--uppercase b6 text-align--right text-color--primary">
                  <span className="block--display">
                    {t("contact.texts.mobile.0")}
                  </span>
                  <span className="block--display">
                    <a onClick={() => { handleLinkClick('/contact/form') }} className="text-color--primary "><u>{t("contact.texts.mobile.1")}</u></a>{t("contact.texts.mobile.2")}
                  </span>
                  <span className="block--display">
                    {t("contact.texts.mobile.3")}
                  </span>
                </p>
              </div>
              <div className="contact__logo-mbl d--h-100">
                <a onClick={() => { handleLinkClick('/contact/form') }} className="text-color--primary "><Scene3DContact /></a>
              </div>
            </>
          ) : (
            <div className="text-3d-logo d--vh-100 position--relative">
              <Scene3DContact hovered={hovered} />
              <TextOverlay
                onMouseEnter={() => {
                  setHovered(true);
                  setCursorVisible(true);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                  setCursorVisible(false);
                }}
                href="/contact/form"
                textColor="text-color--primary"
                textPosition="center"
                className="text-align--center d--w-100 text-decoration--none"
              >
                <h1>
                  <span className="block--display">{t("contact.texts.desktop.0")}</span>
                  <span className="block--display">{t("contact.texts.desktop.1")}</span>
                </h1>
              </TextOverlay>
            </div>
          )}

          <div className="contact__email">
            <ContactLink
              isMobile={isMobile}
              text="paula@sypcreative.com"
              href="mailto:paula@sypcreative.com"
              logoClass="icon-mail"
              logoSize={isMobile ? "h6-mbl" : "h4"}
            />
          </div>

          <div className="contact__links">
            {contactLinks.map((link) => (
              <ContactLink
                key={link.text}
                isMobile={isMobile}
                text={link.text}
                logoClass={link.logoClass}
                href={link.href}
                backgroundColor="background--primary"
                fontSize={link.fontSize || "h5"}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
