import React  from "react";
import "./Menu.scss";

Menu.propTypes = {};

function Menu(props) {
  const { songs, currentSong, setCurrentSong } = props;

  function handleChangeSong(e, index) {
    // setCurrentSong(e.target);
    // console.log(e.target)
    // e.target.closest(".song");
    if (e.target.closest(".song:not(.active)")) {
      setCurrentSong(index);
    }
  }

  return (
    <div className="menu">
      <ul className="song-list">
        {songs.map((song, index) => {
          if (index === currentSong)
            return (
              <li
                key={index}
                className="song active"
                onClick={(e) => handleChangeSong(e, index)}
              >
                <div className="song__img">
                  <img src={song.avatar} />
                </div>
                <div className="song__desc">
                  <h3 className="song-title">{song.title}</h3>
                  <h5 className="song-creator">{song.creator}</h5>
                </div>
              </li>
            );
          return (
            <li
              key={index}
              className="song"
              onClick={(e) => handleChangeSong(e, index)}
            >
              <div className="song__img">
                <img src={song.avatar} />
              </div>
              <div className="song__desc">
                <h3 className="song-title">{song.title}</h3>
                <h5 className="song-creator">{song.creator}</h5>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
