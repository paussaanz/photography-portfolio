// import { Link, useLocation } from "react-router-dom";
// import { useTransition } from "../../contexts/transitionContext";

// const Navbar = () => {
//   const { handleLinkClick } = useTransition();
//   const location = useLocation();

//   const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials' || location.pathname === '/portfolio';


//   return (
//     <nav className={`cus-navbar cus-navbar--expand-lg background--transparent`}>
//       <div className="cus-navbar__container cus-navbar__container-fluid p--y-4">
//         <div className="flex flex--g-1">
//           <ul className="cus-navbar__links m--r-auto m--b-2 m--b-lg-0">
//             <li className="cus-navbar__item">
//               <a onClick={() => handleLinkClick('/portfolio')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 Portfolio
//               </a>
//             </li>
//             <li className="cus-navbar__item">
//               <a onClick={() => handleLinkClick('/editorials')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 Editorials
//               </a>
//             </li>
//             <li className="cus-navbar__item">
//               <a onClick={() => handleLinkClick('/about')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 About SYP!
//               </a>
//             </li>
//           </ul>
//         </div>
//         <a onClick={() => handleLinkClick('/')} className="cus-navbar__logo--centered">
//           <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" loading="lazy"/>
//         </a>
//         <div className="flex">
//           <ul className="cus-navbar__links m--l--auto m--b-2 m--b-lg-0">
//             <li className="nav-item">
//               <a onClick={() => handleLinkClick('/contact')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--navbar-light' : 'text-color--navbar-light'}`}>
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { useTransition } from "../../contexts/transitionContext";
import { useLocation } from "react-router-dom";

const Navbar = ({isMenuOpen, setIsMenuOpen}) => {
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
          <svg className={`ham ham3 ${isMenuOpen ? "active" : ""}`} viewBox="0 0 100 100" width="80" onClick={toggleMenu}>
            <path
              className="line top"
              d="m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568" />
            <path
              className="line middle"
              d="m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7" />
            <path
              className="line bottom"
              d="m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0" />
          </svg>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`cus-navbar__mbl ${isMenuOpen ? "cus-navbar__mbl--open" : ""}`}>
          <ul className="cus-navbar__mbl--links-list">
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

