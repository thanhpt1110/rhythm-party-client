import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useMusicContext } from '../utils/MusicContext';
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}
const SongsOfAlbum = ({ order, song,listOfSong}) => {
   const [isLiked, setIsLiked] = useState(false);
    const handleIconLikeClick = () => {
            setIsLiked(!isLiked);
    };
    const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
    const handlePlayIconClick = async() => {
        await setListOfSong(listOfSong)
        await setMusic(song)
    };
    const {music,  setMusic,setListOfSong, isPlaying} = useMusicContext()
    useEffect(()=>{
      if(music && music._id === song._id)
        setIsCurrentPlaying(isPlaying);
      else
        setIsCurrentPlaying(false);

    },[isPlaying,music])
    const handleDeleteFromPlaylist = () => {
       Swal.fire({
            title: "Are you sure?",
            text: "Do you want to remove this song from Playlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Deleted!",
                text: "Your song has been deleted.",
                icon: "success"
                });
            }
            });
    };
    return (
        <div className='grid grid-cols-5 pl-32 mr-28 ml-14 items-center rounded py-4 hover:bg-slate-800 cursor-pointer '>
            <div className='flex items-center space-x-6 '>
                    <p className='text-gray-500'>{order + 1}.</p>
                    <img className='h-14 w-14 rounded' src={song.imgUrl} alt='' />
                    <div>
                        <p className=' text-base'>{song.musicName}</p>
                        <p className='text-[13px] text-gray-500'>{song.author}</p>
                    </div>
            </div>
              <i
                className={isLiked ? 'ri-heart-fill cursor-pointer ml-16 text-xl' : 'ri-heart-line cursor-pointer ml-16 text-xl'}
                onClick={handleIconLikeClick}>
              </i>
            <p className='text-sm text-gray-500 ml-20'>{formatTime(song.duration)}</p>
             <i
              className={`ri-${isCurrentPlaying ? 'pause-circle-fill text-4xl ml-20' : 'play-circle-fill text-4xl  ml-20'}`}
              onClick={handlePlayIconClick}>
            </i>
            <i className="ri-delete-bin-6-line  text-gray-400" onClick={handleDeleteFromPlaylist}></i>

        </div>
    );
};

export default SongsOfAlbum;
