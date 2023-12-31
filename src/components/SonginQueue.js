import React, { useState } from 'react'

const SonginQueue = ({urlImg,NameSong, Artist, backgroundSong }) => {
   const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayIconClick = () => {
            setIsPlaying(!isPlaying);
    };
  return (
        <div className={`bg-[${backgroundSong}] text-white rounded-lg hover:bg-gray-900 cursor-pointer my-2`} >
         <div className='flex flex-row justify-between py-4 items-center px-2 '>
            <div className='flex flex-row items-center gap-2 '>
              <img src={urlImg} alt="SongImg" className='w-16 h-16 object-cover rounded'  />
              <div className='w-[75%]'>
                <p className='font-bold truncate'>{NameSong}</p>
                <p className='text-gray-500 text-[13px] truncate'>{Artist}</p>
              </div>
            </div>
            <i
                className={`ri-${isPlaying ? 'pause-circle-fill' : 'play-circle-fill'} md:text-3xl cursor-poinmd:scale-125 text-center`} onClick={handlePlayIconClick}>
            </i>
         </div>
    </div>
  )
}

export default SonginQueue
