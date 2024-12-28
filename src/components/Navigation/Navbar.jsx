import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTransition } from "../../contexts/transitionContext";
import { useLocation } from "react-router-dom";
import imgNav from "/images/dropdown.webp";
import LenisContext from "../../contexts/LenisContext";
import LanguageSwitcher from "../General/LanguageSwitcher";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { handleLinkClick } = useTransition();
  const location = useLocation();
  const { t } = useTranslation();
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const { stop, start } = useContext(LenisContext);

  const isPrimaryPage = useMemo(
    () => ["/", "/editorials", "/portfolio"].includes(location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    if (isMenuOpen) {
      stop();
    } else {
      start();
    }

    return () => {
      start();
    };
  }, [isMenuOpen, start, stop]);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [setIsMenuOpen]);
  const togglePortfolioMenu = useCallback(() => setIsPortfolioOpen((prev) => !prev), []);

  const dropdownVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  const subMenuVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" },
  };

  const linkListVariants = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.5, staggerChildren: 0.2 },
    },
    exit: {
      transition: { staggerChildren: 0.15, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const renderLinks = useCallback(
    (links, isSubmenu = false) =>
      links.map((link, index) => {
        const targetPath =
          link.toLowerCase() === t("navbar.home").toLowerCase()
            ? "/"
            : isSubmenu && link.toLowerCase() === t("navbar.portfolio.seeAll").toLowerCase()
              ? "/portfolio/"
              : isSubmenu
                ? `/portfolio/${link.toLowerCase()}`
                : `/${link.toLowerCase().replace(/\s+/g, "")}`;

        return (
          <motion.li
            key={index}
            className={isSubmenu ? "cus-navbar__mbl--submenu--item" : "cus-navbar__mbl--links-item"}
            variants={linkVariants}
          >
            <a
              onClick={() => {
                handleLinkClick(targetPath);
                setIsMenuOpen(false);
              }}
              className={
                isSubmenu
                  ? "cus-navbar__mbl--submenu--link"
                  : "cus-navbar__links--item-link text-color--navbar-light glow-text"
              }
            >
              {link}
            </a>
          </motion.li>
        );
      }),
    [handleLinkClick, setIsMenuOpen, t]
  );

  return (
    <nav className="cus-navbar">
      <div className="cus-navbar__container p--y-4">
        {/* Left Links */}
        <div className="cus-navbar__links">
          <ul className="cus-navbar__links--list">
            {[
              { text: t("syp.commons.portfolio"), link: "portfolio" },
              { text: t("syp.commons.editorials"), link: "editorials" },
              { text: t("syp.commons.about"), link: "aboutsyp!" },
            ].map(
              ({ text, link }, index) => (
                <li key={index} className="cus-navbar__links--item">
                  <a
                    onClick={() =>
                      handleLinkClick(`/${link.toLowerCase().replace(/\s+/g, "")}`)
                    }
                    className="cus-navbar__links--item-link text-color--navbar-light"
                  >
                    {text}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Logo */}
        <a onClick={() => handleLinkClick("/")} className="cus-navbar__logo cus-navbar__logo--centered">
          <img
            data-hover="a"
            src="/logo-white.svg"
            alt="Logo de Gunterz"
            width="39"
            height="61"
            loading="lazy"
          />
        </a>

        {/* Right Link */}
        <div className="cus-navbar__links">
          <ul className="cus-navbar__links--list">
            <li className="cus-navbar__links--item">
              <a
                onClick={() => handleLinkClick("/contact")}
                className="cus-navbar__links--item-link text-color--navbar-light"
              >
                {t("syp.commons.contact")}
              </a>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>

        {/* Burger Menu */}
        <div className="cus-navbar__burger" aria-label="Toggle navigation">
          <img
            data-hover="a"
            className={isMenuOpen ? "active" : ""}
            onClick={toggleMenu}
            src="/logo-white.svg"
            alt="Menu Toggle"
            width="30"
            height="61"
            loading="lazy"
          />
        </div>

        {/* Dropdown Menu */}
        <motion.div
          className={`cus-navbar__mbl ${isMenuOpen ? "cus-navbar__mbl--open" : ""}`}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "exit"}
          variants={dropdownVariants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.ul
            className="cus-navbar__mbl--links-list"
            variants={linkListVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "exit"}
          >
            {renderLinks([t("navbar.home")])}

            <motion.li className="cus-navbar__mbl--links-item" variants={linkVariants}>
              <span
                onClick={togglePortfolioMenu}
                className="cus-navbar__links--item-link text-color--navbar-light glow-text"
              >
                {t("syp.commons.portfolio")}
              </span>
              <AnimatePresence>
                {isPortfolioOpen && (
                  <motion.ul
                    className="cus-navbar__mbl--submenu text-color--secondary"
                    variants={subMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {renderLinks(
                      [
                        t("navbar.portfolio.seeAll"),
                        t("navbar.portfolio.nature"),
                        t("navbar.portfolio.photoshoots"),
                        t("navbar.portfolio.lifestyle"),
                        t("navbar.portfolio.sports"),
                        t("navbar.portfolio.music"),
                      ],
                      true
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {renderLinks([
              t("syp.commons.editorials"),
              t("syp.commons.about"),
              t("syp.commons.contact"),
            ])}
          </motion.ul>
          <motion.div
            className="cus-navbar__mbl--image-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div style={{ maxHeight: "350px", overflow: 'hidden' }} className="flex flex--j-center">
              <img
                src={imgNav}
                alt="Stylized menu image"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
