import React, {useState, useRef} from "react";
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
import Nav from "./components/Nav"
//Import Styles
import './styles/app.scss';
//Import Util
import data from './data';

function App() {
  //ref
  const audioRef = useRef(null);
  //State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime:0,
    duration:0,
});

const [libraryStatus, setLibraryStatus] = useState(false);

const activeLibraryHandler = (nextPrev) => {
  const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id){
          return{
              ...song,
              active:true,
          }
      }else {
          return{
              ...song, 
              active: false,
          };
      }
  });
  setSongs(newSongs);
}

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration })

};
const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
  if (isPlaying) audioRef.current.play();
}
  return (
    <div className={`App ${libraryStatus ? "libraryActive" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} /> 
      <Player
      activeLibraryHandler={activeLibraryHandler}
      setSongs={setSongs}
      setCurrentSong={setCurrentSong}
      songs={songs}
      audioRef={audioRef} 
      currentSong={currentSong}
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying}
      setSongInfo={setSongInfo}
      songInfo={songInfo}/>
      <Library 
      libraryStatus={libraryStatus}
      songs={songs} 
      setCurrentSong={setCurrentSong} 
      audioRef={audioRef}
      isPlaying={isPlaying}
      setSongs={setSongs}/>
      <audio 
            onTimeUpdate={timeUpdateHandler} 
            ref={audioRef} 
            src={currentSong.audio}
            onLoadedMetadata={timeUpdateHandler}
            onEnded={songEndHandler}
            >
            </audio>
    </div>
  );
}

export default App;
