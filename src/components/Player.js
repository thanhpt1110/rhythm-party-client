import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMusicContext } from '../utils/MusicContext';
import ToolTip from './ToolTip';

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
const Player = () => {
    const audioRef = useRef(null)
    const [isLiked, setIsLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handleIconLikeClick = () => {
            setIsLiked(!isLiked);
    };
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    const [audioData, setAudioData] = useState(null);
    const {music,setMusic,isPlaying, setIsPlaying} = useMusicContext()
    const handlePlayIconClick = () => {
        if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying)
    };
    const handleLoopIconClick = () => {
        setIsLooping(!isLooping);
    };
    useEffect(() => {
    if (isLooping) {
        audioRef.current.loop = true;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    }
    else {
        audioRef.current.loop = false;
    }
    }, [isLooping]);
    const handleSeekChange = (e) => {
        const newValue = e.target.value;
        // Cập nhật thời gian hiện tại của bài hát dựa trên giá trị thanh trượt
        setCurrentTime(newValue);
        audioRef.current.currentTime = newValue;
      };
    useEffect(()=>{
        if(music!==null && music!==undefined)
        {
            setIsPlaying(true);
            audioRef.current.play();
        }
    },[music]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
       audioRef.current.volume = volume;
    }, 300); // Thời gian chờ debounce (300ms)
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [volume]);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value / 100);
    setVolume(newVolume);
  };
  const increaseVolume = () => {
    if (volume <= 0.9) {
      setVolume((prevVolume) => parseFloat((prevVolume + 0.1).toFixed(1)));
    } else {
      setVolume(1);
    }
  };

  const decreaseVolume = () => {
    if (volume >= 0.1) {
      setVolume((prevVolume) => parseFloat((prevVolume - 0.1).toFixed(1)));
    } else {
      setVolume(0);
    }
  };
  const [showSubMenu, setShowSubMenu] = useState(false);
  const handleIconAddPlaylistClick = () => {
    setShowSubMenu(!showSubMenu);
  };

    return (
      <div className='z-[99] fixed w-full bottom-0'>
        <div className=' h-20  bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* Left */}
            {music && <audio ref={audioRef} src={music.url}  onTimeUpdate={handleTimeUpdate} />}

            <div className='flex items-center gap-2 md:gap-0'>
                <img
                    className='hidden md:inline h-12 w-12 rounded object-cover'
                    src={music !==null ? music.imgUrl : 'https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg'}
                    alt='playerImg'
                />
                <div className='md:w-36 w-20 md:ml-4 flex flex-col gap-[2px] '>
                    <h3 className=' font-bold text-[12px] md:text-base truncate'>{music && music.musicName}</h3>
                    <p className=' font-semibold text-[10px] md:text-xs text-gray-300 truncate'>{music && music.author}</p>
                </div>
               <div className='ml-4 md:ml-20 w-full'>
                 <ToolTip text="Add to Favorite">
                  <i  className={isLiked ? 'ri-heart-fill text-xs md:text-xl  cursor-pointer' : 'ri-heart-line text-xs md:text-xl cursor-pointer'}
                    onClick={handleIconLikeClick}></i>
                  </ToolTip>
               </div>
                <div className='w-full'>
                  <ToolTip text="Add to Playlist">
                    <i onClick={handleIconAddPlaylistClick} className="ri-play-list-fill text-xs md:text-xl cursor-pointer "></i>
                  </ToolTip>
                  {showSubMenu && (
                    <div className='absolute bottom-20 left-96 mt-12 px-2 pt-2 pb-10 text-sm bg-gray-700 rounded shadow'>
                      <ul className='text-white '>
                        <li className='flex flex-row gap-2 items-center hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer' >
                          <i className="ri-add-fill"></i>
                          <p>Create new Playlist</p>
                        </li>
                        <li className='flex flex-row gap-2 items-center hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer' >
                          <i className="ri-play-list-2-fill"></i>
                          <p>Playlist 1</p>
                        </li>
                        <li className='flex flex-row gap-2 items-center hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer' >
                          <i className="ri-play-list-2-fill"></i>
                          <p>Playlist 2</p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

            </div>
            {/* Center */}
            <div className='items-center flex md:flex-col justify-evenly '>
                <div className='hidden sm:flex flex-row items-center mt-2'>
                    <button
                        type='button'
                        className='hidden lg:mr-4 lg:block text-white'
                    >
                    </button>
                    <p className='text-white text-xs'>
                        {formatTime(currentTime)}
                    </p>
                    <input
                        type='range'
                        min={0}
                        max={audioRef.current ? audioRef.current.duration : 100}
                        value={currentTime}
                        onChange={handleSeekChange}
                        className='md:block w-24 md:w-96 h-1 mx-4 md:mx-6 rounded-lg '

                    />
                    <p className='text-white text-xs'>
                        {formatTime(music ? music.duration : 0)}
                    </p>
                    <button
                        type='button'
                        className='hidden lg:ml-4 lg:block text-white '
                    >
                    </button>
                </div>
                <div className='flex items-stretch justify-evenly gap-2 md:gap-14 mt-8 md:mt-0 '>
                    <i className='ri-arrow-left-right-fill button'></i>
                    <i className='ri-rewind-fill button'></i>
                     <i
                        className={`ri-${isPlaying ? 'pause-circle-fill' : 'play-circle-fill'} h-10 w-10 md:text-2xl cursor-pointer md:scale-125 hover:scale-125 transition transform duration-100 ease-out text-center`}
                        onClick={handlePlayIconClick}
                    ></i>
                    <i className='ri-speed-fill button'></i>
                    <i
                        className={`ri-loop-left-fill button ${isLooping ? 'text-gray-500' : ''}`}
                        onClick={handleLoopIconClick}></i>
                </div>

            </div>
            {/* Right */}
            <div className='flex flex-row items-center space-x-1 md:space-x-3 justify-end md:pl-0 md:pr-3 mt-3 md:mt-0'>
               {volume === 0 ? (
                        <i className='ri-volume-mute-fill button' ></i>
                    ) : (
                        <i
                        className={`ri-volume-down-fill button`}
                        onClick={decreaseVolume}
                        ></i>
                )}
                <input
                    className='w-14 md:w-24 mb-[6px] md:mt-3 h-1 rounded-full'
                    type='range'
                    value={volume*100}
                    onChange={handleVolumeChange}
                    min={0}
                    max={100}
                />
                <i className='ri-volume-up-fill button' onClick={increaseVolume}></i>
            </div>
        </div>
      </div>

    );
};

export default Player;
