import React, { useEffect, useState } from 'react'
import { useRoomContext } from '../utils/RoomContext';

const SonginQueue = ({music, backgroundSong, listOfSong }) => {
   const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
    const handlePlayIconClick = async () => {
      await setListOfSong(listOfSong);
      await setMusicCurrent(music);
    };

    const {musicCurrent,  setMusicCurrent,setListOfSong, isPlaying,setIsPlaying} = useRoomContext()
    const handlePlayMusic = ()=>{
      setIsPlaying(!isPlaying)
    }
    useEffect(()=>{
      if(musicCurrent && musicCurrent._id === music._id)
        setIsCurrentPlaying(isPlaying);
      else
        setIsCurrentPlaying(false);
    },[isPlaying,musicCurrent])
  return (
        <div className={`bg-[${backgroundSong}] text-white rounded-lg hover:bg-gray-900 cursor-pointer my-2`} onClick={handlePlayIconClick}>
         <div className='flex flex-row justify-between py-4 items-center px-2 '>
            <div className='flex flex-row items-center gap-2 '>
              <img src={music.imgUrl} alt="SongImg" className='w-16 h-16 object-cover rounded'  />
              <div className='w-[75%]'>
                <p className='font-bold trmusicuncate'>{music.musicName}</p>
                <p className='text-gray-500 text-[13px] truncate'>{music.author}</p>
              </div>
            </div>
            <i
                className={`ri-${isCurrentPlaying ? 'pause-circle-fill' : 'play-circle-fill'} md:text-3xl cursor-poinmd:scale-125 text-center`} onClick={handlePlayMusic}>
            </i>
         </div>
    </div>
  )
}

export default SonginQueue
