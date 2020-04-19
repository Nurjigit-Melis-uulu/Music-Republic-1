import React from "react";
import classes from "./Footer.module.css";
import githubLogo from "../../../assets/logo/github.png";

function Footer(props) {
  return (
    <footer className={classes.Footer}>
      <a
        href="https://github.com/SonunDevs"
        title="https://github.com/SonunDevs"
      >
        <img src={githubLogo} alt="github" />
      </a>
      <p>
        2020 create by{" "}
        <a
          href="https://github.com/SonunDevs"
          title="https://github.com/SonunDevs"
          target="_blank"
          rel="noopener noreferrer"
        >
          SonunDevs
        </a>
      </p>
    </footer>
  );
}

export default Footer;
