import React from "react";
import { connect } from "react-redux";

import classes from "./Playlist.module.css";
import Card from "../Card/Card";

function Playlist(props) {
  let list = "loading";
  let findIdx = (el) => {
    for (let i = 0; i < props.tracks.length; i++) {
      const element = props.tracks[i];

      if (element.id === el) {
        return i;
      }
    }
  };

  if (props.tracks) {
    list = props.tracks.map((track) => {
      return (
        <Card
          index={findIdx(track.id)}
          key={track.id}
          title={track.title}
          artist_name={track.artist.name}
        />
      );
    });
  }

  return (
    <div className={classes.Playlist}>
      <h2>New music</h2>
      <div className={classes.playlist__items}>{list}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
  };
};

export default connect(mapStateToProps, null)(Playlist);
