import React from "react";
import { connect } from "react-redux";

import classes from "./Playlist.module.css";
import Card from "../Card/Card";

function Playlist(props) {
  console.log(props.tracks);
  let list = "loading";

  if (props.tracks) {
    list = props.tracks.map((track) => {
      return (
        <Card
          key={track.id}
          title={track.title}
          artist_name={track.artist.name}
        />
      );
    });
  }

  return <div className={classes.Playlist}>{list}</div>;
}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
  };
};

export default connect(mapStateToProps, null)(Playlist);
