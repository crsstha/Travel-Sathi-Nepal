import "./Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import UserMenu from "./UserMenu";
import { Fragment, useState } from "react";
import gif from "../img/nav.gif";

export default function Navbar(user) {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  console.log(user.user.isHost);
  return (
    <Fragment>
      {user.user.isHost === "false" && user.user.isAdmin === "false" ? (
        <div className="navbar">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
            <img src={gif} alt="" />
              <strong style={{ fontSize: "28px" }}>
                <span style={{ color: "Orange" }}>Travel </span>
                <span style={{ color: "Green" }}>Sathi </span>
                <span style={{ color: "Red" }}>Nepal </span>
              </strong>
             
            </Link>
          </div>
          <div
            className={
              showMediaIcons ? "nav-list mobile-menu-link" : "nav-list"
            }
          >
            <ul>
              <li>
                <Link className="navbar-brand btn-1" to="/becomeahost">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/aboutus">
                  About us
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="usermenu">
            <UserMenu />
          </div>
          <div className="hamburger-menu">
            <Link to="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="navbar-header">
            <Link class="navbar-brand" to="/">
              <img src={gif} alt="" />
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
                <Link className="navbar-brand btn-1" to="/host/addVehicle">
                  Add a Vehicle
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/aboutus">
                  About us
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="navbar-brand btn-1" to="/host/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="SignIn">
            <UserMenu user="user" />
          </div>
          <div className="hamburger-menu">
            <Link to="#">
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
}
