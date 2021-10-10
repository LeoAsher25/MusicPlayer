import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import Menu from "../Menu";
import "./PlayerMusic.scss";

function PlayerMusic() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const requestUrl = `https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setSongs(responseJSON.songs.top100_VN[0].songs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSongs();
  }, []);

  if (songs.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="player-music">
      <Dashboard
        playing={playing}
        setPlaying={setPlaying}
        songs={songs}
        currentSong={currentSong}
        handleChangeSong={setCurrentSong}
      />
      <Menu
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}

export default PlayerMusic;

// avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033.jpg"
// bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/07/13/0/6/d/2/1626145766324_600.jpg"
// coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
// creator: "Phúc Chinh"
// lyric: "https://lrc-nct.nixcdn.com/2021/03/22/2/8/d/4/1616360845396.lrc"
// music: "https://aredir.nixcdn.com/NhacCuaTui1012/TheLuong-PhucChinh-6971140.mp3?st=hZuS9PhE7Q9uDENJRbtBMA&e=1627505676"
// title: "Thê Lương"
// url: "https://www.nhaccuatui.com/bai-hat/the-luong-phuc-chin
