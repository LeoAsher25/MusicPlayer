import React, { useRef, useEffect } from "react";
import "./DashboardHeader.scss";

DashboardHeader.propTypes = {};

function DashboardHeader(props) {
  const { playing, songs, currentSong } = props;
  const dashboardHeader = useRef();

  document.onscroll = () => handleScrollCD();

  function handleScrollCD() {
    // const cd = dashboardHeader.current.querySelector(".cd");
    // const cdWidth = cd.offsetWidth;

    // const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // const newCdWidth = cdWidth - scrollTop;
    // console.log("cd width: ", cdWidth, newCdWidth);
    // // cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    // // cd.style.opacity = newCdWidth / cdWidth;
  }

  useEffect(() => {
    // console.log("dashboard header: ", playing);
    // get node
    dashboardHeader.current = document.querySelector(".dashboard-header");

    // toggle class playing and paused when playing and pause
    if (playing) {
      dashboardHeader.current.classList.add("playing");
      dashboardHeader.current.classList.remove("paused");
    } else {
      dashboardHeader.current.classList.remove("playing");
      dashboardHeader.current.classList.add("paused");
    }
  }, [playing]);

  return (
    <div className="dashboard-header playing">
      <div className="title">
        <h5>Now Playing:</h5>
        <h3>{songs[currentSong].title}</h3>
      </div>
      <div className="cd">
        <div
          className="img"
          style={{ background: `url(${songs[currentSong].avatar})` }}
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
