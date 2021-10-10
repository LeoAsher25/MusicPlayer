import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Process.scss";

Process.propTypes = {
  handlePlayBtn: PropTypes.func,
};

function formatTime(second) {
  if (!second) return "00:00";
  let hours = `0${Math.floor(second / 3600)}`.slice(-2);
  let minutes = `0${Math.floor((second % 3600) / 60)}`.slice(-2);
  let seconds = `0${Math.floor((second % 3600) % 60)}`.slice(-2);

  let timeString;
  hours > 0
    ? (timeString = `${hours}:${minutes}:${seconds}`)
    : (timeString = `${minutes}:${seconds}`);
  return timeString;
}

function Process(props) {
  const {
    playing,
    setPlaying,
    handlePlayBtn,
    handleChangeSong,
    songs,
    currentSong,
  } = props;
  const process = useRef();
  const audio = useRef();
  const progressBar = useRef();
  const volumeBar = useRef();
  const isRepeat = useRef(false);
  const isRandom = useRef(false);

  useEffect(() => {
    // get node
    process.current = document.querySelector(".process");
    audio.current = process.current.querySelector("audio");
    progressBar.current = process.current.querySelector("#progress");
    volumeBar.current = process.current.querySelector("#volume");

    const currentTimeSpan = process.current.querySelector(".current-time");
    const durationTimeSpan = process.current.querySelector(".duration");
    progressBar.current.value = 0;
    volumeBar.current.value = 50;
    audio.current.volume = 0.5;

    // set current time, duration and progress bar;
    const progreeBarInterval = setInterval(() => {
      let currentTime = audio.current.currentTime;
      let durationTime = audio.current.duration;

      currentTimeSpan.innerHTML = formatTime(currentTime);
      durationTimeSpan.innerHTML = formatTime(durationTime);

      const seekPersen =
        (audio.current.currentTime / audio.current.duration) * 100;
      progressBar.current.value = seekPersen;
      if (progressBar.current.value >= 100 && isRepeat === false) {
        handleChangeSong(currentSong + 1);
      }
    }, 1000);

    // set play for song, cause song doesnt play automatically
    if (playing) {
      audio.current.play();
    }
    return () => {
      clearInterval(progreeBarInterval);
    };
  }, [currentSong, playing]);

  // handl when click repear btn
  function handleClickRepeatBtn(e) {
    isRepeat.current = !isRepeat.current;
    const repeatBtn = e.target.closest(".repeat-btn");
    repeatBtn.classList.toggle("active", isRepeat.current);
    audio.current.loop = isRepeat.current;
  }

  // gen random song
  function genRandomSong() {
    let newSong;
    do {
      newSong = Math.floor(Math.random() * songs.length);
    } while (newSong === currentSong);
    handleChangeSong(newSong);
  }

  //  handle when click prev btn
  function handleClickPrevBtn() {
    if (isRandom.current) {
      genRandomSong();
    } else {
      if (currentSong === 0) handleChangeSong(songs.length - 1);
      else handleChangeSong(currentSong - 1);
    }
  }

  //  handle when click play btn
  function handleClickPlayBtn(e) {
    //toggle class playing when click
    process.current.classList.toggle("playing");
    handlePlayBtn(process.current.classList.contains("playing"));

    // isPlaying = true when audio playing
    if (process.current.classList.contains("playing")) {
      audio.current.play();
      setPlaying(true);
    } else {
      audio.current.pause();
      setPlaying(false);
    }
  }

  //  handle when click next btn
  function handleClickNextBtn() {
    if (isRandom.current) {
      genRandomSong();
    } else {
      if (currentSong === songs.length - 1) handleChangeSong(0);
      else handleChangeSong(currentSong + 1);
    }
  }

  //handle when click random btn
  function handleClickRandomBtn(e) {
    isRandom.current = !isRandom.current;
    const repeatBtn = e.target.closest(".random-btn");
    repeatBtn.classList.toggle("active", isRandom.current);
    audio.current.loop = isRandom.current;
  }

  //handle process bar change
  function handleProgressBarChange(e) {
    const seekTime = (audio.current.duration / 100) * e.target.value;
    audio.current.currentTime = seekTime;
  }

  //handle when audio ended
  function handleAudioEnded() {
    if (isRepeat.current) {
      audio.current.play();
    } else {
      handleClickNextBtn();
    }
  }

  function handleVolumeOnChange(e) {
    const volumeWrap = e.target.closest(".volume-wrap");
    audio.current.volume = volumeBar.current.value / 100;
    if (volumeBar.current.value >= 50) {
      if (volumeWrap.classList.contains("mute"))
        volumeWrap.classList.remove("mute");
      else if (volumeWrap.classList.contains("volume-down"))
        volumeWrap.classList.remove("volume-down");
      volumeWrap.classList.add("volume-up");
    } else if (volumeBar.current.value < 50 && volumeBar.current.value > 0) {
      if (volumeWrap.classList.contains("mute"))
        volumeWrap.classList.remove("mute");
      else if (volumeWrap.classList.contains("volume-up"))
        volumeWrap.classList.remove("volume-up");
      volumeWrap.classList.add("volume-down");
    } else if (volumeBar.current.value == 0) {
      if (volumeWrap.classList.contains("volume-up"))
        volumeWrap.classList.remove("volume-up");
      else if (volumeWrap.classList.contains("volume-down"))
        volumeWrap.classList.remove("volume-down");
      volumeWrap.classList.add("mute");
    }
  }

  return (
    <div className="process">
      <ul className="action">
        <li
          onClick={(e) => handleClickRepeatBtn(e)}
          className="action-btn repeat-btn"
        >
          <i className="fas fa-redo"></i>
        </li>
        <li onClick={handleClickPrevBtn} className="action-btn">
          <i className="fas fa-step-backward"></i>
        </li>
        <li onClick={handleClickPlayBtn} className="action-btn">
          <i className="fas fa-pause"></i>
          <i className="fas fa-play"></i>
        </li>
        <li onClick={handleClickNextBtn} className="action-btn">
          <i className="fas fa-step-forward"></i>
        </li>
        <li
          onClick={(e) => handleClickRandomBtn(e)}
          className="action-btn random-btn"
        >
          <i className="fas fa-random"></i>
        </li>
      </ul>

      <div className="progress-wrap">
        <span className="current-time">00:00:00</span>
        <input
          onChange={(e) => handleProgressBarChange(e)}
          id="progress"
          className="progress-bar"
          type="range"
          step="1"
          min="0"
          max="100"
        />
        <span className="duration">00:00:00</span>
      </div>
      <div className="volume-wrap  volume-up">
        <div className="volume-icon-wrap">
          <i className="bi bi-volume-mute-fill"></i>
          <i className="bi bi-volume-down-fill"></i>
          <i className="bi bi-volume-up-fill"></i>
        </div>
        <div className="volume-bar-wrap">
          <input
            onChange={(e) => handleVolumeOnChange(e)}
            id="volume"
            className="volume-bar"
            type="range"
            step="1"
            min="0"
            max="100"
          />
        </div>
      </div>

      <audio
        id="audio"
        src={songs[currentSong].music}
        onEnded={handleAudioEnded}
      ></audio>
    </div>
  );
}

export default Process;
