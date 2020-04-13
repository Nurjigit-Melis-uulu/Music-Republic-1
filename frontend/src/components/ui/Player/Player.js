import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Player.module.css";
import axios from "../../../axios";

import play_btn_png from "../../../assets/icons/play-button.png";
import pause_btn_png from "../../../assets/icons/pause-button.png";
import prev_btn_png from "../../../assets/icons/prev-button.png";
import next_btn_png from "../../../assets/icons/next-button.png";
import option_btn_png from "../../../assets/icons/option-button.png";
import arrow_btn_png from "../../../assets/icons/arrow-button.png";
import volume_png from "../../../assets/icons/volume.png";
import repeate_png from "../../../assets/icons/repeate.png";
import random_png from "../../../assets/icons/random-playing.png";

class Player extends Component {
  state = {
    track: {
      index: this.props.playingTrackIndex,
      mp3: this.props.tracks
        ? this.props.tracks[this.props.playingTrackIndex].mp3.url
        : "https://mn1.sunproxy.net/file/UFNaaG1nc0V2cHh1dmM1VzJJNHNGc3ZpbnE1UFh1MnNDTmp1VytESlRhT0NlV2NKYmFETnRRSVMzbkNnOHhRbEpSazBmSXRtSDRaVjA3Ynlab3IvUEN5QXpKR3F6OTRrZlRGNnd4bzZPUFU9/Billie_Eilish_-_bad_guy_(mp3.mn).mp3",
    },
    option_state: {
      open: false,
      state: "none",
    },
    slider_width: {
      full: "100%",
      elapsed: 1,
      buffered: 0,
    },
    volume_slider_width: "100%",
    slider_focus: false,
    music: null,
    play: false,
    volume: 1,
  };

  option_drawer = () => {
    let open = !this.state.option_state.open;

    if (open) {
      this.setState({
        option_state: {
          open: true,
          state: "block",
        },
      });
    } else {
      this.setState({
        option_state: {
          open: false,
          state: "none",
        },
      });
    }
  };

  slider_click = (event) => {
    this.slider_check(event);
    this.setState({
      slider_focus: true,
    });
  };

  slider_cursor_move = (event) => {
    if (this.state.slider_focus) {
      this.slider_check(event);
    }
  };

  slider_not_focus = () => {
    this.setState({
      slider_focus: false,
    });
  };

  slider_check = (event) => {
    let size = event.target.getBoundingClientRect();
    let slider_width = this.state.slider_width;
    let music = this.state.music;

    if (size.x > event.clientX) {
      slider_width.elapsed = 0;
    } else if (size.x + size.width < event.clientX) {
      slider_width.elapsed = size.width;
    } else {
      slider_width.elapsed = event.clientX - size.x;
    }

    music.currentTime = Math.floor(
      (slider_width.elapsed * music.duration) / size.width
    );

    this.setState({
      slider_width,
    });
  };

  timeUpdate = () => {
    let music = this.state.music;
    let slider_width = this.state.slider_width;
    let elapsed =
      this.state.slider_width.full * (music.currentTime / music.duration);
    slider_width.elapsed = elapsed;

    this.setState({
      slider_width,
    });

    this.bufferUpdate();
  };

  bufferUpdate = () => {
    let music = this.state.music;
    let slider_width = this.state.slider_width;
    let bufferPercent =
      this.state.slider_width.full * (music.buffered.end(0) / music.duration);
    slider_width.buffered = bufferPercent;

    this.setState({
      slider_width,
    });
  };

  changeVolume = (event) => {
    let volume = +event.target.value;
    let musicVolume = this.state.music;

    musicVolume.volume = volume;

    this.setState({
      volume,
    });
  };

  componentDidMount() {
    let slider_width = this.state.slider_width;
    slider_width.full = document
      .querySelector("#slider_box")
      .getBoundingClientRect().width;

    this.setState({
      music: document.querySelector("#music"),
      slider_width,
    });
  }

  play_btn_func = () => {
    let play = !this.state.play;

    if (play) {
      this.state.music.play();
    } else {
      this.state.music.pause();
    }

    this.setState({
      play,
    });
  };

  formatSecondsAsTime = (secs, format) => {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
  };

  render() {
    console.log(this.state.track, this.props.tracks);

    let play_button_icon = play_btn_png;
    let music_time = {
      currentTime: "0:00",
      duration: "0:00",
    };

    if (this.state.music !== null) {
      let dur = this.formatSecondsAsTime(this.state.music.duration);

      dur === "NaN:NaN" ? (dur = "0:00") : (dur = dur + "");

      music_time = {
        currentTime: this.formatSecondsAsTime(this.state.music.currentTime),
        duration: dur,
      };
    } else {
      music_time = {
        currentTime: "0:00",
        duration: "0:00",
      };
    }

    if (this.state.play) {
      play_button_icon = pause_btn_png;
    } else {
      play_button_icon = play_btn_png;
    }

    return (
      <div className={classes.Player}>
        <audio preload="true" id="music" onTimeUpdate={this.timeUpdate}>
          <source src={this.state.track.mp3} type="audio/mpeg" />
        </audio>
        <div className={classes.slider_wrapper}>
          <span className={classes.slider_time}>{music_time.currentTime}</span>
          <div
            className={classes.slider}
            style={{ width: this.state.slider_width.elapsed + "px" }}
          ></div>
          <div
            className={classes.slider_buffered}
            style={{ width: this.state.slider_width.buffered + "px" }}
          ></div>
          <span className={classes.slider_time}>{music_time.duration}</span>
          <div
            className={classes.slider_box}
            id="slider_box"
            onMouseDown={this.slider_click}
            onMouseMove={this.slider_cursor_move}
            onMouseUp={this.slider_not_focus}
            onMouseLeave={this.slider_not_focus}
          ></div>
        </div>
        <div className={classes.player__controls_container}>
          <div className={classes.controls}>
            <button className={classes.option_btn} onClick={this.option_drawer}>
              <img src={option_btn_png} alt="option button" />
            </button>
            <div>
              <button className={classes.prev_btn}>
                <img src={prev_btn_png} alt="prev button" />
              </button>
              <button className={classes.play_btn} onClick={this.play_btn_func}>
                <img src={play_button_icon} alt="play and pause buttons" />
              </button>
              <button className={classes.next_btn}>
                <img src={next_btn_png} alt="next button" />
              </button>
            </div>
            <button className={classes.opener_btn}>
              <img src={arrow_btn_png} alt="arrow button" />
            </button>
          </div>
          <div
            className={classes.options}
            style={{ display: this.state.option_state.state }}
          >
            <div className={classes.volume_box}>
              <button className={classes.volume}>
                <img src={volume_png} alt="volume button" />
              </button>
              <div className={classes.volume_slider_wrapper}>
                <input
                  type="range"
                  step="0.1"
                  max="1"
                  min="0"
                  onChange={this.changeVolume}
                />
                <div
                  className={classes.volume_slider}
                  style={{ width: this.state.volume * 100 + "%" }}
                ></div>
              </div>
            </div>
            <div className={classes.options_playing}>
              <button className={classes.repeate_track_btn}>
                <img src={repeate_png} alt="repeate button" />
              </button>
              <button className={classes.random_playing_btn}>
                <img src={random_png} alt="random button" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    playingTrackIndex: state.playingTrackIndex,
  };
};

export default connect(mapStateToProps, null)(Player);
