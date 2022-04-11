import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
  setSongs,
  isPlaying,
  audioRef,
  songs,
  setCurrentSong,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'toggle-library' : ''}`}>
      <h2 className="library-title">Library</h2>
      <div>
        {songs.map(song => (
          <LibrarySong
            setSongs={setSongs}
            songs={songs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            song={song}
            setCurrentSong={setCurrentSong}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
