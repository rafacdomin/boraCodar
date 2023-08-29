import { useRef, useState } from 'react'
import { FaForward, FaBackward, FaPause, FaPlay } from 'react-icons/fa'
import ProgressBar from '../../components/progressBar';


const MusicPlayer = ({ className, src, play = false, ...props }) => {
  const [playing, setPlaying] = useState(play);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const audioRef = useRef(null);

  const getMinutes = (timeInSeconds) => {
    if (timeInSeconds < 60) {
      if(timeInSeconds < 10) {
        return `00:0${parseInt(timeInSeconds)}`
      }

      return `00:${parseInt(timeInSeconds)}`
    }
    
    let minutes = parseInt(timeInSeconds / 60);
    let seconds = parseInt(timeInSeconds % 60);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return(`${minutes}:${seconds}`);
  }

  const playAudio = () => {
    audioRef.current.play();

    setIntervalId(
      // eslint-disable-next-line no-undef
      setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000)
    );
  }

  const pauseAudio = () => {
    audioRef.current.pause();

    // eslint-disable-next-line no-undef
    clearInterval(intervalId)
  }

  const updateCurrentTime = (percentage) => {
    const newTime = percentage/100 * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  const previousMusic = () => {
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
  }

  const nextMusic = () => {
    setCurrentTime(duration);
    audioRef.current.currentTime = duration;

    pauseAudio();
  }

  const progress = currentTime/duration * 100;

  return (
    <div className={`flex flex-col bg-purple-950 p-10 rounded-2xl gap-8 text-stone-200 ${className}`} {...props}>
      <div id="info" className='flex flex-col gap-8'>
        <img src="cover.png" alt="Album Cover" />
        <div>
          <h1 className='text-3xl'>Acorda Devinho</h1>
          <p>Banda Rocketseat</p>
        </div>
      </div>

      <div id="controls" className='flex flex-col gap-8'>
        <div className='flex justify-between'>
          <FaBackward onClick={previousMusic} title='Previous Music' className='cursor-pointer' />
          {playing ?
            <FaPause onClick={pauseAudio} title='Pause' className='cursor-pointer' />
            :
            <FaPlay onClick={playAudio} title='Play' className='cursor-pointer' />
          }
          <FaForward onClick={nextMusic} title='Next Music' className='cursor-pointer' />
        </div>

        <div id="progress" className='flex flex-col gap-2'>
          {/* eslint-disable jsx-a11y/media-has-caption */}
          <audio
            autoPlay={false}
            src={src}
            ref={audioRef}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            preload="metadata"
          >
            Your browser does not support the audio element.
          </audio>

          <ProgressBar value={progress} onClick={updateCurrentTime} />

          <div className='flex justify-between text-sm text-gray-300'>
            <span>
              {getMinutes(currentTime)}
            </span>
            <span>
              {getMinutes(duration - currentTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer;