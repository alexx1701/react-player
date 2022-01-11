import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../util';

const Player = ({currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, audioRef, songs, setSongs}) => {
   //UseEffect
   useEffect(() => {
    const newSongs = songs.map((song) => {
        if (song.id === currentSong.id){
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
   }, [currentSong]);
    //Event Handler
    const playSongHandler = () => {
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    
    const getTime = time => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    };
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skipForward'){
            setCurrentSong(songs[(currentIndex+1) % songs.length])
        }
        if (direction === 'skipBack'){
            if((currentIndex -1) % songs.length === -1){
                setCurrentSong(songs[songs.length -1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex-1) % songs.length])
        }
        playAudio(isPlaying, audioRef);
    };
    //State
    return (
        <div className="player">
            <div className="timeControl">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track">
                <input 
                min={0} 
                max={songInfo.duration || 0} 
                value={songInfo.currentTime} 
                type="range"
                onChange={dragHandler} 
                />
                <div className="animateTrack"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="playControl">
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skipBack')} className="skipBack" icon={faAngleLeft} size="2x"/>
                <FontAwesomeIcon onClick={playSongHandler}className="play" icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon onClick={()=> skipTrackHandler('skipForward')} className="skipForward" icon={faAngleRight} size="2x"/>
            </div>
        </div>


    )
}

export default Player;