import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Player.module.css";

import play_btn_png from "../../../assets/icons/play-button.png";
import pause_btn_png from "../../../assets/icons/pause-button.png";
import prev_btn_png from "../../../assets/icons/prev-button.png";
import next_btn_png from "../../../assets/icons/next-button.png";
import option_btn_png from "../../../assets/icons/option-button.png";
import arrow_btn_png from "../../../assets/icons/arrow-button.png";
import volume_full_png from "../../../assets/icons/volume.png";
import volume_mid_png from "../../../assets/icons/volume_mid.png";
import volume_null_png from "../../../assets/icons/volume_null.png";
import repeate_png from "../../../assets/icons/repeate.png";
import random_png from "../../../assets/icons/random-playing.png";

class Player extends Component {
  state = {
    track: {
      index: this.props.playingTrackIndex,
      mp3: this.props.tracks
        ? "http://localhost" +
          this.props.tracks[this.props.playingTrackIndex].mp3.url
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

  // показ и скрытие окошка дополнительных опций
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

  // проверка позиций слайдера
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

  // функция обновление проигранного части аудио
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

  // функция обновление буферазации аудио
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

  // функция изменение громкости звука
  changeVolume = (event) => {
    let volume = +event.target.value;
    let musicVolume = this.state.music;

    musicVolume.volume = volume;

    this.setState({
      volume,
    });
  };

  // функция проигрывание
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

  // форматирование времени аудио
  formatSecondsAsTime = (secs, format) => {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
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

  // функция приглушение звука
  volume_toggle = () => {
    let music = this.state.music;
    if (music.muted) {
      music.muted = false;
    } else {
      music.muted = true;
    }
  };

  render() {
    let play_button_icon = play_btn_png;
    let volume_png = volume_full_png;
    let music = this.state.music;
    let music_time = {
      currentTime: "0:00",
      duration: "0:00",
    };

    // условии времени музыки
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

    // условии для изменения иконки проигрывание
    if (this.state.play) {
      play_button_icon = pause_btn_png;
    } else {
      play_button_icon = play_btn_png;
    }

    // условии для изменения иконки громкости
    if (music && music.muted) {
      volume_png = volume_null_png;
    } else if (this.state.volume > 0.5) {
      volume_png = volume_full_png;
    } else if (this.state.volume <= 0.5 && this.state.volume > 0) {
      volume_png = volume_mid_png;
    } else if (this.state.volume === 0) {
      volume_png = volume_null_png;
    }

    return (
      <div className={classes.Player}>
        <audio preload="true" id="music" onTimeUpdate={this.timeUpdate}>
          <source
            src={
              "http://localhost:1337/uploads/2b7bb6ae95db4e0b838655e1cf907d3a.mp3"
            }
            type="audio/mpeg"
          />
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
                <img
                  src={volume_png}
                  alt="volume button"
                  onClick={this.volume_toggle}
                />
              </button>
              <div className={classes.volume_slider_wrapper}>
                <input
                  type="range"
                  step="0.01"
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
