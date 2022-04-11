import React, { useState, useRef } from 'react';

import './styles/styles.scss';
// import components
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';
import Footer from './components/Footer';
// import data
import data from './data';
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // audio ref
  const audioRef = useRef(null);

  // set song info
  const timeUpdateHandler = e => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  const endSongHandler = async () => {
    const currentIndex = songs.findIndex(
      selectedSong => selectedSong.id === currentSong.id
    );
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    audioRef.current.pause();
    setTimeout(() => {
      if (isPlaying) audioRef.current.play();
    }, 500);
  };

  return (
    <div
      className={`App ${libraryStatus && 'app-avtive'}`}
      // onClick={() => libraryStatus && setLibraryStatus(false)}
    >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <audio
        onEnded={endSongHandler}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
      <Footer />
    </div>
  );
}

export default App;
