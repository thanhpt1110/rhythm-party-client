import React, { useEffect, useState } from 'react'
import { useRoomContext } from '../utils/RoomContext';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
const SonginQueue = ({isOwner, music, backgroundSong, listOfSong, onRemoveSongClick }) => {
   const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);

    const handleDeteleFromQueue = async() => {
      if( roomCurrent.currentMusicPlay && roomCurrent.currentMusicPlay._id === music._id)
      {
        toast.error("Music is running");
        return;
      }
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
    const {roomCurrent, isPlaying,setIsPlaying} = useRoomContext()

    useEffect(()=>{
      if(roomCurrent && roomCurrent.currentMusicPlay && roomCurrent.currentMusicPlay._id === music._id)
        setIsCurrentPlaying(isPlaying);
      else
        setIsCurrentPlaying(false);
    },[isPlaying,roomCurrent])
  return (
        <div className={`bg-[${backgroundSong}] text-white rounded-lg hover:bg-gray-900 my-2`} >
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
         <div className='flex flex-row justify-between py-4 items-center px-4 '>
            <div className='flex flex-row items-center gap-2 '>
              <img src={music.imgUrl} alt="SongImg" className='w-16 h-16 object-cover rounded'  />
              <div className='w-[75%]'>
                <p className='font-bold truncate w-48'>{music.musicName}</p>
                <p className='text-gray-500 text-[13px] w-32 truncate'>{music.author}</p>
              </div>
            </div>
            <i
                className={`ri-${isCurrentPlaying ? 'pause-circle-fill' : 'play-circle-fill'} md:text-3xl cursor-pointer md:scale-125 text-center`} >
            </i>
            {isOwner && <i class="ri-delete-bin-6-line text-sm text-gray-400 hover:text-white cursor-pointer" onClick={handleDeteleFromQueue}></i>}
         </div>
    </div>
  )
}

export default SonginQueue
