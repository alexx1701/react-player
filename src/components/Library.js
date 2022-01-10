import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'activeLibrary' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
            {songs.map((song) => (
            <LibrarySong audioRef={audioRef}
            song={song} 
            setCurrentSong={setCurrentSong} 
            songs={songs}
            id={song.id}
            setSongs={setSongs}
            isPlaying={isPlaying}
            key={song.id}/>))}
            </div>
        </div>
    )
};

export default Library;