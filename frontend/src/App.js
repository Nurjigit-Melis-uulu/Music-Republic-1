import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./App.module.css";
import axios from "./axios";
import Home from "./pages/Home/Home";

class App extends Component {
  componentDidMount() {
    axios
      .get("/tracks")
      .then((response) => {
        // console.log(response.data);
        this.props.onAddTracks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/albums")
      .then((response) => {
        // console.log(response.data);
        this.props.onAddAlbums(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <Route path="/" component={Home} exact />
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTracks: (tracks) => dispatch({ type: "ADD_TRACKS", tracks }),
    onAddAlbums: (albums) => dispatch({ type: "ADD_ALBUMS", albums }),
  };
};

export default connect(null, mapDispatchToProps)(App);
