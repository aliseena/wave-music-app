import React from 'react';

const Song = ({ currentSong }) => {
  return (
    <div>
      <div className="song-container">
        <img src={currentSong.cover} alt="Song cover" />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;