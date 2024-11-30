import { delay, motion } from "framer-motion";
import { useTransition } from "../../contexts/transitionContext";
import { useLocation } from "react-router-dom";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { handleLinkClick } = useTransition();
  const location = useLocation();

  console.log(isMenuOpen, "HYODVS")
  const isPrimaryPage =
    location.pathname === "" ||
    location.pathname === "/editorials" ||
    location.pathname === "/portfolio";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };


  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, x: '100%', y: 0 },
    visible: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: "-100%", y: 0 }, // Slide out to the left
  };

  // Link list container animation
  const linkListVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.9, // 5-second delay before starting staggered animations
        staggerChildren: 0.3, // Delay each child animation by 0.1s
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.2, // Stagger exit animations
        staggerDirection: -1, // Reverse order for exiting
      },
    },
  };

  // Individual link animation
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },  // Exit upwards

  };

  return (
    <nav className="cus-navbar">
      <div className="cus-navbar__container p--y-4">
        {/* Left Links */}
        <div className="cus-navbar__links">
          <ul className="cus-navbar__links--list">
            <li className="cus-navbar__links--item">
              <a
                onClick={() => handleLinkClick("/portfolio")}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Portfolio
              </a>
            </li>
            <li className="cus-navbar__links--item">
              <a
                onClick={() => handleLinkClick("/editorials")}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Editorials
              </a>
            </li>
            <li className="cus-navbar__links--item">
              <a
                onClick={() => handleLinkClick("/about")}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                About SYP!
              </a>
            </li>
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
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Burger Menu */}
        <div
          className="cus-navbar__burger"
          aria-label="Toggle navigation"        >
          <img
            className={`${isMenuOpen && "active"}`}
            onClick={toggleMenu}
            src="/logo-white.svg"
            alt="Logo de Gunterz"
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
          {/* Link List with Staggered Animation */}
          <motion.ul
            className="cus-navbar__mbl--links-list"
            variants={linkListVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "exit"}
          >
            {["Home", "Portfolio", "Editorials", "About", "Contact"].map(
              (link, index) => (
                <motion.li
                  key={index}
                  className="cus-navbar__mbl--links-item"
                  variants={linkVariants}
                >
                  <a
                    onClick={() => {
                      handleLinkClick(
                        link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "")}`
                      );
                      setIsMenuOpen(false);
                    }}
                    className="cus-navbar__links--item-link text-color--navbar-light"
                  >
                    {link}
                  </a>
                </motion.li>
              )
            )}
          </motion.ul>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;

