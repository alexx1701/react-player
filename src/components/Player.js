import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    
    const audioRef = useRef(null);
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
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration })

    };
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
    //State
    const [songInfo, setSongInfo] = useState({
        currentTime:0,
        duration:0,
    });
    return (
        <div className="player">
            <div className="timeControl">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min={0} 
                max={songInfo.duration} 
                value={songInfo.currentTime} 
                type="range"
                onChange={dragHandler} 
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="playControl">
                <FontAwesomeIcon className="skipBack" icon={faAngleLeft} size="2x"/>
                <FontAwesomeIcon onClick={playSongHandler}className="play" icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon className="skipForward" icon={faAngleRight} size="2x"/>
            </div>
            <audio 
            onTimeUpdate={timeUpdateHandler} 
            ref={audioRef} 
            src={currentSong.audio}
            onLoadedMetadata={timeUpdateHandler}
            >
            </audio>
        </div>


    )
}

export default Player;