/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
//Updating the logo
const Navbar = () => {
  const [active, setActive] = useState("");
  //Link is active or not
  const [toggle, setToggle] = useState(false);
  //Toggling the menu
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      {/* Navbar */}
      <div
        className={`w-full flex justify-between items-center max-w-7xl mx-auto`}
      >
        <Link
          to="/"
          className={`flex items-center gap-2`}
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Link Containing the name and Logo for which on by clicking will be going up */}
          <img src={logo} alt="logo" className={`w-11 h-11 object-contain`} />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Sanskar &nbsp;<span className="sm:block hidden">| Portfolio</span>{" "}
          </p>
        </Link>
        <ul className={`list-none hidden sm:flex flex-row gap-10`}>
          {/* Listing all the Links of Subsections */}
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          {/* Displaying of menu in Mobile Sectin */}
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul
              className={`list-none flex justify-end items-start flex-col gap-4`}
            >
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium text-[16px] cursor-pointer`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
