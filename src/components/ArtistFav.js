import React from 'react'

const ArtistFav = ({ urlImg, ArtistName , role }) => {
  return (
    <div className=''>
      <div className=' bg-[#181818] hover:bg-gray-800 w-full text-white flex flex-col gap-1 cursor-pointer rounded-lg pb-4 pt-2 px-[10px] items-center 2xl:items-start '>
      <div className=''>
        <img src={urlImg} alt="ArtistImage" className=' rounded-full w-40 h-40 object-cover' />
      </div>
        <p className='font-semibold text-base mt-2'>{ArtistName}</p>
        <p className='text-xs text-gray-400'>{role}</p>
    </div>
  </div>
  )
}

export default ArtistFav
