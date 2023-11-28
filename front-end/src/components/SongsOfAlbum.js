import React, { useState } from 'react';

const SongsOfAlbum = ({ order, track, imgSong, artist,duration }) => {
   const [isLiked, setIsLiked] = useState(false);
    const handleIconLikeClick = () => {
            setIsLiked(!isLiked);
    };
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayIconClick = () => {
            setIsPlaying(!isPlaying);
    };
    return (
        <div className='grid grid-cols-4 pl-32 mr-28 ml-14 items-center rounded py-4 hover:bg-slate-800 cursor-pointer '>
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
        </div>
    );
};

export default SongsOfAlbum;
