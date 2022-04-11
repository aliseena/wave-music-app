import React from 'react';
const LibrarySong = ({
  audioRef,
  song,
  songs,
  setCurrentSong,
  isPlaying,
  setSongs,
}) => {
  const selectSongHandler = async () => {
    setCurrentSong(song);
    const newSongs = songs.map(newSong => {
      // if clicked song id matches any of song in the songs array
      if (newSong.id === song.id) {
        return {
          ...newSong,
          active: true,
        };
      } else {
        return {
          ...newSong,
          active: false,
        };
      }
    });
    await setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={selectSongHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt="Song cover" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
