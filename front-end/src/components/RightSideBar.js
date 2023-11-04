import React from 'react'
import FavoriteSongs from './FavoriteSongs'

const RightSideBar = () => {
  return (
     <div className='w-full flex flex-col mt-8'>
          <div className='flex flex-row justify-between items-center '>
            <div className='flex gap-1'>
               <h2 className='font-bold'>Favorite Playlist</h2>
            <i className="ri-heart-3-fill"></i>
            </div>
            <span className='text-indigo-500 cursor-pointer text-xs'>See more</span>
          </div>
          <div className='mt-6'>
            <FavoriteSongs/>
          </div>


    </div>
  )
}

export default RightSideBar
