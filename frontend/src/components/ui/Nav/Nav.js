import React from "react";
import classes from "./Nav.module.css";
import logo from "../../../assets/logo/MR-transparent.png";

function Nav(props) {
  return (
    <div className={classes.Nav}>
      <div className={classes.navItems}>
        <div className={classes.navLogo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
