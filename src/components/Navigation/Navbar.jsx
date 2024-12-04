import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTransition } from "../../contexts/transitionContext";
import { useLocation } from "react-router-dom";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { handleLinkClick } = useTransition();
  const location = useLocation();
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  const isPrimaryPage = ["/", "/editorials", "/portfolio"].includes(location.pathname);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const togglePortfolioMenu = () => setIsPortfolioOpen((prev) => !prev);

  // Framer Motion Variants
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
      transition: { delayChildren: 0.9, staggerChildren: 0.3 },
    },
    exit: {
      transition: { staggerChildren: 0.2, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const renderLinks = (links, isSubmenu = false) =>
    links.map((link, index) => {
      const targetPath =
        isSubmenu && link.toLowerCase() === "see all"
          ? "/portfolio/" // Redirect to /portfolio/ for "See all"
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
    });
    
  return (
    <nav className="cus-navbar">
      <div className="cus-navbar__container p--y-4">
        {/* Left Links */}
        <div className="cus-navbar__links">
          <ul className="cus-navbar__links--list">
            {["Portfolio", "Editorials", "About SYP!"].map((link, index) => (
              <li key={index} className="cus-navbar__links--item">
                <a
                  onClick={() => handleLinkClick(`/${link.toLowerCase().replace(/\s+/g, "")}`)}
                  className={`cus-navbar__links--item-link ${isPrimaryPage ? "text-color--navbar-light" : "text-color--navbar-light"
                    }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <a
          onClick={() => handleLinkClick("/")}
          className="cus-navbar__logo cus-navbar__logo--centered"
        >
          <img
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
                className={`cus-navbar__links--item-link ${isPrimaryPage ? "text-color--navbar-light" : "text-color--navbar-light"
                  }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Burger Menu */}
        <div className="cus-navbar__burger" aria-label="Toggle navigation">
          <img
            className={`${isMenuOpen && "active"}`}
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
          className={`cus-navbar__mbl ${isMenuOpen && "cus-navbar__mbl--open"}`}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "exit"}
          variants={dropdownVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="cus-navbar__mbl--image-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src="./images/dropdown.webp"
              alt="Decorative"
              className="cus-navbar__mbl--image"
            />
          </motion.div>
          <motion.ul
            className="cus-navbar__mbl--links-list"
            variants={linkListVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "exit"}
          >
            {renderLinks([""])}

            <motion.li className="cus-navbar__mbl--links-item" variants={linkVariants}>
              <span
                onClick={togglePortfolioMenu}
                className="cus-navbar__links--item-link text-color--navbar-light glow-text"
              >
                Portfolio
              </span>
              <AnimatePresence>
                {isPortfolioOpen && (
                  <motion.ul
                    className="cus-navbar__mbl--submenu"
                    variants={subMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {renderLinks(["See all", "Nature", "Photoshoots", "Lifestyle", "Sports", "Music"], true)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>

            {renderLinks(["Editorials", "AboutSyp!", "Contact"])}
          </motion.ul>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
