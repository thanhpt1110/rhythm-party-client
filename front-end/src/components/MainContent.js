import React from 'react'
import RightSideBar from './RightSideBar'
import SongCard from './SongCard'
import ArtistCard from './ArtistCard'

const MainContent = () => {
  return (
     <div className=' py-20 max-w-screen-xl md:flex flex-wrap justify-between mx-auto p-4 text-white'>
                <div className='md:w-[70%] '>
                  <h2 className='text-2xl pb-2'>Top Songs:</h2>
                  <h6 className='text-gray-500 pb-4'>The most played tracks on RhythmParty this week</h6>
                  <SongCard/>

                  <ArtistCard/>
                </div>
                <div className='md:w-[30%] px-6'>
                  <RightSideBar/>
                </div>
     </div>
  )
}

export default MainContent
