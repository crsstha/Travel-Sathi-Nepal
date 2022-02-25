import "./Navbar.css";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Home from "../home/Home";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../img/logo.png";
import Login from "../login/Login";

export default function Navbar() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="navbar">
      <div className="navbar-header">
        <Link class="navbar-brand" to="/">
          <strong style={{ fontSize: "28px" }}>
            <span style={{ color: "Orange" }}>Travel </span>
            <span style={{ color: "Green" }}>Sathi </span>
            <span style={{ color: "Red" }}>Nepal </span>
          </strong>
        </Link>
      </div>
      <div className="nav-list">
        <ul>
          <li>
            <Link className="navbar-brand btn-1" to="#">
              Become a Host
            </Link>
          </li>
          <li>
            <Link className="navbar-brand btn-1" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar-brand btn-1" to="#home">
              About us
            </Link>
          </li>
          <li>
            <Link className="navbar-brand btn-1" to="#home">
              Contact
            </Link>
          </li>
          <li>
            <Link className="navbar-brand btn-1" to="/Register">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
      <div className="SignIn">
        <Link className="navbar-brand btn btn-outline-success" to="/login">
          Sign In
        </Link>
      </div>
      <div className="hamburger">
        <Link to="#">
          <GiHamburgerMenu />
        </Link>
      </div>
    </div>
  );
}

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
