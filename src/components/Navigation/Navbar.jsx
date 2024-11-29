import { useState } from "react";
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
        <div
          className={`cus-navbar__mbl ${isMenuOpen ? "cus-navbar__mbl--open" : ""}`}>
          <ul className="cus-navbar__mbl--links-list">
            <li className="cus-navbar__mbl--links-item">
              <a
                onClick={() => {
                  handleLinkClick("/");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Home
              </a>
            </li>
            <li className="cus-navbar__mbl--links-item">
              <a
                onClick={() => {
                  handleLinkClick("/portfolio");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Portfolio
              </a>
            </li>
            <li className="cus-navbar__mbl--links-item">
              <a
                onClick={() => {
                  handleLinkClick("/editorials");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                Editorials
              </a>
            </li>
            <li className="cus-navbar__mbl--links-item">
              <a
                onClick={() => {
                  handleLinkClick("/about");
                  setIsMenuOpen(false);
                }}
                className={`cus-navbar__links--item-link ${isPrimaryPage
                  ? "text-color--navbar-light"
                  : "text-color--navbar-light"
                  }`}
              >
                About SYP!
              </a>
            </li>
            <li className="cus-navbar__mbl--links-item">
              <a
                onClick={() => {
                  handleLinkClick("/contact");
                  setIsMenuOpen(false);
                }}
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
      </div>
    </nav>
  );
};

export default Navbar;

