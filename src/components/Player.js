import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({activeLibraryHandler, currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, audioRef, songs, setSongs}) => {
  
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
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skipForward'){
        await setCurrentSong(songs[(currentIndex+1) % songs.length])
        activeLibraryHandler(songs[(currentIndex+1) % songs.length])
        }
        if (direction === 'skipBack'){
            if((currentIndex -1) % songs.length === -1){
                await setCurrentSong(songs[songs.length -1]);
                activeLibraryHandler(songs[songs.length -1])
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex-1) % songs.length])
            activeLibraryHandler(songs[(currentIndex-1) % songs.length])
        }
        if(isPlaying) audioRef.current.play();
    };
    //State
    const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
    
    return (
        <div className="player">
            <div className="timeControl">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}className="track">
                <input 
                min={0} 
                max={songInfo.duration || 0} 
                value={songInfo.currentTime} 
                type="range"
                onChange={dragHandler} 
                />
                <div className="animateTrack" style={{
                transform: `translateX(${animationPercentage}%)`
                }}></div>
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