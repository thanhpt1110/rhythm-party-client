import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMusicContext } from '../utils/MusicContext';
import ToolTip from './ToolTip';
import updateViewMusic from '../api/MusicApi'
import { useAuth } from '../utils/AuthContext';
import { getPlaylistCurrentUser, createPlaylist, addMusicToPlaylist } from '../api/PlaylistApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
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
    const [timeMusicPlay,setTimeMusicPlay] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [yourListPlaylist, setYourListPlaylist] = useState([])
    const [volume, setVolume] = useState(0.5);
    const {authUser} = useAuth();
    const [selectedPlaylistPrivacy, setSelectedPlaylistPrivacy] = useState("Private");
    const [isEnableCreatePlaylist, setIsEnableCreatePlaylist] = useState(true);
    const [playlistName, setPlaylistName] = useState('');
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);

    const handleChangePlaylistName = (e)=>{
      setPlaylistName(e.target.value)
    }
    const handleRadioChange = (event) => {
      setSelectedPlaylistPrivacy(event.target.id);
    };
    const handleIconLikeClick = () => {
            setIsLiked(!isLiked);
    };
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    const [enableChangeSong, setEnableChangeSong] = useState(true);
    const {music,setMusic,isPlaying, setIsPlaying,listOfSong,updatePlaylist, setListOfSong,setUpdatePlaylist} = useMusicContext()
    if(!listOfSong)
      setListOfSong([music])
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const debounceTimeoutChangeSongButton =()=> setTimeout(() => {
       setEnableChangeSong(true); //
      clearTimeout(debounceTimeoutChangeSongButton);
    }, 800);
    useEffect(()=>{
      try{
        const getPlaylist = async() =>{
          const respone = await getPlaylistCurrentUser();
          console.log(respone)
          setYourListPlaylist(respone.data.data);
        }
        if(authUser)
          getPlaylist()
      }
      catch(e)
      {
        console.log(e);
      }
    },[updatePlaylist])
    const playNextSong = () => {
        if (enableChangeSong) {
      let nextIndex;
      if (isShuffleEnabled) {
        // Lấy một chỉ mục ngẫu nhiên khác với `currentSongIndex`
        nextIndex = Math.floor(Math.random() * listOfSong.length);
        while (nextIndex === currentSongIndex) {
          nextIndex = Math.floor(Math.random() * listOfSong.length);
        }
      } else {
        nextIndex = (currentSongIndex + 1) % listOfSong.length;
      }
      setCurrentSongIndex(nextIndex);
      // Update the music context to the next song
      setMusic(listOfSong[nextIndex]);
      setEnableChangeSong(false);
      debounceTimeoutChangeSongButton();
    }
  };
  const toggleShuffle = () => {
  setIsShuffleEnabled(!isShuffleEnabled);
};
    const playBackSong = () => {
      if(enableChangeSong) {
      // Increment the index to get the next song
      const backIndex = (currentSongIndex - 1+ listOfSong.length) % listOfSong.length;
      setCurrentSongIndex(backIndex);
      // Update the music context to the next song
      setMusic(listOfSong[backIndex]);
      setEnableChangeSong(false);
      debounceTimeoutChangeSongButton();
      // Play the next song
      }};
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
    const handleSongEnd = useCallback(() => {
      // If looping is enabled, play the same song again
      if (isLooping) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        // Otherwise, play the next song
        const nextIndex = (currentSongIndex + 1) % listOfSong.length;
        if(nextIndex===currentSongIndex)
        {
          setIsPlaying(!isPlaying)
          return;
        }
        playNextSong();
      }
    }, [isLooping, currentSongIndex, listOfSong]);
    const handleCloseModal = () => {
      const modal = document.getElementById('my_modal_3');
      if (modal) {
        modal.close();
      }
    };
    const handlePlaylistOnclick = async (e)=>{
      try{
        if(isEnableCreatePlaylist)
        {
          setIsEnableCreatePlaylist(false)
          const playlist = {
            playlistName: playlistName,
            privacyStatus: selectedPlaylistPrivacy
          }
          const respone = await createPlaylist(playlist);
          console.log(respone)
          setIsEnableCreatePlaylist(true)
          setUpdatePlaylist(!updatePlaylist)
          handleCloseModal()
        }
      }
      catch(e)
      {
        console.log(e)
      }

    }
    useEffect(() => {
      // Set up event listener for the ended event
      audioRef.current.addEventListener('ended', handleSongEnd);

      // Clean up the event listener on component unmount
      return () => {
        audioRef.current && audioRef.current.removeEventListener('ended', handleSongEnd);
      };
    }, [handleSongEnd]);
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

  const putMusicToPlaylist = async (playlist)=>{
    if(!playlist.listMusic.includes(music._id))
    {
      console.log("hello")
      const respone = await addMusicToPlaylist(music._id,playlist._id);
      setYourListPlaylist(prevPlaylists => (
        prevPlaylists.map(playlist =>
          playlist._id === respone.data.data._id ? { ...playlist, ...respone.data.data } : playlist
        )
      ));
    }
    toast.success("Music added to playlist");
  }
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
  const onClickNextSong = ()=>{
    if(listOfSong.length === 1)
    {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    playNextSong();
  }
  const onClickBackSong = ()=>{
    if(listOfSong.length === 1)
    {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    playBackSong();
  }
    return (
      <div className='z-[99] fixed w-full bottom-0'>
                 <ToastContainer position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              className=''
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark" />
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
               {authUser && (
               <div className='ml-4 md:ml-20 w-full'>
                 <ToolTip text="Add to Favorite">
                  <i  className={isLiked ? 'ri-heart-fill text-xs md:text-xl  cursor-pointer' : 'ri-heart-line text-xs md:text-xl cursor-pointer'}
                    onClick={handleIconLikeClick}></i>
                  </ToolTip>
               </div>)}
               {authUser && (
                <div className='w-full'>
                  <ToolTip text="Add to Playlist">
                    <i onClick={handleIconAddPlaylistClick} className="ri-play-list-fill text-xs md:text-xl cursor-pointer "></i>
                  </ToolTip>
                  {showSubMenu && (
                    <div className='absolute bottom-20 left-96 mt-12 px-2 pt-2 pb-10 text-sm bg-gray-700 rounded shadow'>
                      <ul className='text-white '>
                        <li className='flex flex-row gap-2 items-center hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()} >
                          <i className="ri-add-fill"></i>
                          <p>Create new Playlist</p>
                        </li>
                        {
                          yourListPlaylist.map((playlist,index)=>
                            (
                              <li
                              key={index}
                              value={playlist._id}
                              onClick={async (e)=>{e.preventDefault();
                              await putMusicToPlaylist(playlist);
                              setShowSubMenu(false);

                                }
                              }
                              className='flex flex-row gap-2 items-center hover:bg-gray-600 px-4 py-2 rounded-lg cursor-pointer' >
                              <i className="ri-play-list-2-fill"></i>
                                <p>{playlist.playlistName}</p>
                              </li>
                            )
                          )
                        }

                      </ul>
                    </div>
                  )}
                </div>)}

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
                    <i className={`ri-shuffle-fill button ${isShuffleEnabled ? 'text-gray-500' : ''}`} onClick={toggleShuffle}></i>
                    <i className='ri-rewind-fill button' onClick={playBackSong}></i>
                     <i
                        className={`ri-${isPlaying ? 'pause-circle-fill' : 'play-circle-fill'} h-10 w-10 md:text-2xl cursor-pointer md:scale-125 hover:scale-125 transition transform duration-100 ease-out text-center`}
                        onClick={handlePlayIconClick}
                    ></i>
                    <i className='ri-speed-fill button' onClick={onClickNextSong}></i>
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
        <dialog id="my_modal_3" className="modal text-white">
                <div className="modal-box bg-[#1f2937]">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost hover:bg-slate-600 absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-xl text-center pt-2">Create new PlayList!</h3>
                  <div className='flex flex-row gap-2 items-center '>
                    <p className='py-4 font-semibold'>Playlist Title</p>
                    <span className='text-red-600'>*</span>
                  </div>
                  <input type="text" value={playlistName} onChange={handleChangePlaylistName} className='w-full rounded py-[6px] bg-[#1f2937] border border-gray-400 px-4' required />
                  <div className='flex flex-row gap-2 items-center '>
                    <p className='py-4 font-semibold'>Privacy</p>
                    <span className='text-red-600'>*</span>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <div >
                      <input type="radio" name="visibility" id="Public"/>
                      <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300 "
                      checked={selectedPlaylistPrivacy === "Public"} onChange={handleRadioChange}>Public</label>
                    </div>
                    <div>
                    <input type="radio" name="visibility" id="Private" checked={selectedPlaylistPrivacy === "Private"} onChange={handleRadioChange}/>
                      <label htmlFor="Private" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300">Private</label>
                    </div>
                    <p className='ml-7 text-[10px] text-gray-400'>Only you and people share a secret link with will be able to listen to this track</p>
                  </div>
                  <button className='w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 rounded-xl mt-10 mb-2'
                  onClick={handlePlaylistOnclick}>Create</button>
                </div>
        </dialog>
      </div>

    );
};

export default Player;
