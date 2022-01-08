import React, {useState} from "react";
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
//Import Styles
import './styles/app.scss';
//Import Util
import data from './util';

function App() {
  //State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} /> 
      <Player 
      currentSong={currentSong}
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying}/>
      <Library songs={songs}/>
    </div>
  );
}

export default App;
