import React from "react";

import classes from "./Card.module.css";

function Card(props) {
  return (
    <div className={classes.Card}>
      {props.title}
      {props.artist_name}
    </div>
  );
}

export default Card;
