import React from 'react'

const Playlist = ({urlImg,playlistName, author }) => {
  return (
    <div className=''>
      <div className=' bg-[#181818] w-full text-white flex flex-col gap-1 cursor-pointer hover:bg-gray-800 rounded-lg pb-4 pt-2 px-[10px] items-center 2xl:items-start text-center md:text-start'>
      <div className='w-40 h-40 '>
        <img src={urlImg} alt="SongImage" className=' rounded w-40 h-40 object-cover' />
      </div>
        <p className='font-semibold text-base mt-2 truncate w-full'>{playlistName}</p>
        <p className='text-xs text-gray-400 truncate w-full'>{author}</p>
    </div>
  </div>
  )
}

export default Playlist
