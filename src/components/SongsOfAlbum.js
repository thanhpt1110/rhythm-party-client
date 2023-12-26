import React, { useState } from 'react';
import Swal from 'sweetalert2';
const SongsOfAlbum = ({ order, track, imgSong, artist,duration }) => {
   const [isLiked, setIsLiked] = useState(false);
    const handleIconLikeClick = () => {
            setIsLiked(!isLiked);
    };
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayIconClick = () => {
            setIsPlaying(!isPlaying);
    };
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
                    <img className='h-14 w-14 rounded' src={imgSong} alt='' />
                    <div>
                        <p className=' text-base'>{track}</p>
                        <p className='text-[13px] text-gray-500'>{artist}</p>
                    </div>
            </div>
              <i
                className={isLiked ? 'ri-heart-fill cursor-pointer ml-16 text-xl' : 'ri-heart-line cursor-pointer ml-16 text-xl'}
                onClick={handleIconLikeClick}>
              </i>
            <p className='text-sm text-gray-500 ml-20'>{duration}</p>
             <i
              className={`ri-${isPlaying ? 'pause-circle-fill text-4xl ml-20' : 'play-circle-fill text-4xl  ml-20'}`}
              onClick={handlePlayIconClick}>
            </i>
            <i className="ri-delete-bin-6-line  text-gray-400" onClick={handleDeleteFromPlaylist}></i>

        </div>
    );
};

export default SongsOfAlbum;
