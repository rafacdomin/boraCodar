import { useCallback, useEffect, useRef, useState } from 'react';
import { FaForward, FaBackward, FaPause, FaPlay } from 'react-icons/fa';
import ProgressBar from '../../components/progressBar';

const MusicPlayer = ({ className, data, hideProgress, stack, ...props }) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const audioRef = useRef(null);

  const getMinutes = (timeInSeconds) => {
    if (timeInSeconds < 60) {
      if (timeInSeconds < 10) {
        return `00:0${parseInt(timeInSeconds)}`;
      }

      return `00:${parseInt(timeInSeconds)}`;
    }

    let minutes = parseInt(timeInSeconds / 60);
    let seconds = parseInt(timeInSeconds % 60);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const playAudio = () => {
    setPlaying(true);
    audioRef.current.play();

    clearInterval(intervalId);

    setIntervalId(
      setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000),
    );
  };

  const pauseAudio = () => {
    setPlaying(false);
    audioRef.current.pause();

    clearInterval(intervalId);
  };

  const updateCurrentTime = (percentage) => {
    const newTime = (percentage / 100) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const previousMusic = () => {
    setCurrentTime(0);
    audioRef.current.currentTime = 0;

    if (playing) {
      audioRef.current.play();
    }
  };

  const nextMusic = () => {
    setCurrentTime(duration);
    audioRef.current.currentTime = duration;

    pauseAudio();
  };

  useEffect(() => {
    previousMusic();
  }, [data]);

  const progress = (currentTime / duration) * 100;

  return (
    <div
      className={`flex flex-col bg-purple-950 p-10 rounded-2xl gap-8 text-stone-200 ${className}`}
      {...props}
      style={{
        maxWidth: stack ? '500px' : '300px',
        minWidth: stack ? '500px' : '300px',
      }}
    >
      <div id="info" className={`flex items-center gap-8 ${stack ? 'flex-row' : 'flex-col'}`}>
        <img
          src={data.image}
          alt="Album Cover"
          className={`${stack ? 'w-1/4' : 'w-full'}`}
          style={{ maxWidth: '180px' }}
        />
        <div className={stack ? '' : 'flex flex-col items-center'}>
          <h1 className="text-xl text-center">{data.name}</h1>
          <p className="text-lg text-center">{data.artist}</p>
        </div>
      </div>

      <div id="controls" className={`flex flex-col ${!hideProgress ? 'gap-8' : ''}`}>
        <div className="flex justify-between">
          <FaBackward onClick={previousMusic} title="Previous Music" className="cursor-pointer" />
          {playing ? (
            <FaPause onClick={pauseAudio} title="Pause" className="cursor-pointer" />
          ) : (
            <FaPlay onClick={playAudio} title="Play" className="cursor-pointer" />
          )}
          <FaForward onClick={nextMusic} title="Next Music" className="cursor-pointer" />
        </div>

        <div id="progress" className="flex flex-col gap-2">
          {/* eslint-disable jsx-a11y/media-has-caption */}
          <audio
            autoPlay={false}
            src={data.preview_url}
            ref={audioRef}
            onEnded={pauseAudio}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            preload="metadata"
          >
            Your browser does not support the audio element.
          </audio>

          {!hideProgress ? (
            <>
              <ProgressBar value={progress} onClick={updateCurrentTime} />

              <div className="flex justify-between text-sm text-gray-300">
                <span>{getMinutes(currentTime)}</span>
                <span>{getMinutes(duration - currentTime)}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
