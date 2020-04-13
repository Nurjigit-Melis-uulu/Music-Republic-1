import React from "react";
import { connect } from "react-redux";

import classes from "./Card.module.css";

function Card(props) {
  return (
    <div className={classes.Card}>
      <div className={classes.Card__backdrop}>
        <div
          className={classes.Card__play_btn}
          onClick={() => props.onAddPlayingTrackIndex(props.index)}
        >
          <div></div>
        </div>
      </div>
      <div className={classes.Card__info}>
        <h3 title={props.title}>{props.title}</h3>
        <h3 title={props.artist_name}>{props.artist_name}</h3>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlayingTrackIndex: (index) =>
      dispatch({ type: "ADD_PLAYING_TRACK_INDEX", index }),
  };
};

export default connect(null, mapDispatchToProps)(Card);
