import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  songInfo,
  setSongInfo,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  // handlers
  const audioHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // format start & end time
  const formateTime = time =>
    Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  // slider drag function
  const dragSlider = e => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // skip forward & backward
  const skipSongHandler = async direction => {
    // check if clicked song id is matching the current song
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (direction === 'skip-forward')
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (direction === 'skip-back') {
      if (currentIndex - 1 === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  useEffect(() => {
    const newSongs = songs.map(newSong => {
      // if clicked song id matches any of song in the songs array
      if (newSong.id === currentSong.id) {
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
    setSongs(newSongs);
  }, [currentSong]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{formateTime(songInfo.currentTime)}</p>
        <input
          onChange={dragSlider}
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          name=""
          id=""
        />
        <p>
          {songInfo.duration
            ? formateTime(songInfo.duration)
            : '00' + ':' + '00'}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipSongHandler('skip-back')}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={audioHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipSongHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
