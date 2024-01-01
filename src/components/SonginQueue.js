import React, { useEffect, useState } from 'react'
import { useRoomContext } from '../utils/RoomContext';
import Swal from 'sweetalert2';
const SonginQueue = ({music, backgroundSong, listOfSong, onRemoveSongClick }) => {
   const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
    const handlePlayIconClick = async () => {
      await setListOfSong(listOfSong);
      await setMusicCurrent(music);
      setIsPlaying(!isPlaying)
    };
    const handleDeteleFromQueue = async() => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this song from Queue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await onRemoveSongClick();
          Swal.fire({
            title: "Deleted!",
            text: "Your song has been removed.",
            icon: "success"
          });
        }
      });
    }
    const {musicCurrent,  setMusicCurrent,setListOfSong, isPlaying,setIsPlaying} = useRoomContext()

    useEffect(()=>{
      if(musicCurrent && musicCurrent._id === music._id)
        setIsCurrentPlaying(isPlaying);
      else
        setIsCurrentPlaying(false);
    },[isPlaying,musicCurrent])
  return (
        <div className={`bg-[${backgroundSong}] text-white rounded-lg hover:bg-gray-900 my-2`} >
         <div className='flex flex-row justify-between py-4 items-center px-4 '>
            <div className='flex flex-row items-center gap-2 '>
              <img src={music.imgUrl} alt="SongImg" className='w-16 h-16 object-cover rounded'  />
              <div className='w-[75%]'>
                <p className='font-bold truncate w-48'>{music.musicName}</p>
                <p className='text-gray-500 text-[13px] w-32 truncate'>{music.author}</p>
              </div>
            </div>
            <i
                className={`ri-${isCurrentPlaying ? 'pause-circle-fill' : 'play-circle-fill'} md:text-3xl cursor-pointer md:scale-125 text-center`} onClick={handlePlayIconClick}>
            </i>
            <i class="ri-delete-bin-6-line text-sm text-gray-400 hover:text-white cursor-pointer" onClick={handleDeteleFromQueue}></i>
         </div>
    </div>
  )
}

export default SonginQueue
