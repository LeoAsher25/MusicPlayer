import React from "react";
import DashboardHeader from "../DashboardHeader";
import Process from "../Process";
import "./Dashboard.scss";

Dashboard.propTypes = {};

function Dashboard(props) {
  const { playing, setPlaying, songs, currentSong, handleChangeSong } = props;

  // handle play, next, prev

  // handle play btn click
  return (
    <div className="dashboard">
      <DashboardHeader
        playing={playing}
        setPlaying={setPlaying}
        songs={songs}
        currentSong={currentSong}
      />
      <Process
        playing={playing}
        setPlaying={setPlaying}
        handlePlayBtn={setPlaying}
        handleChangeSong={handleChangeSong}
        songs={songs}
        currentSong={currentSong}
      />
    </div>
  );
}

export default Dashboard;
