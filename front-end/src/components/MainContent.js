import React from 'react'
import RightSideBar from './RightSideBar'
import SongCard from './SongCard'
import ArtistCard from './ArtistCard'
import Playlist from './Playlist'

const MainContent = () => {
  return (
     <div className=' py-20 max-w-screen-xl md:flex flex-wrap justify-between mx-auto p-4 text-white'>
                <div className='md:w-[70%] '>
                  <p className='text-white font-bold text-2xl pb-2'>Top Songs</p>
                  <h6 className='text-gray-400 text-[14px] pb-4'>The most played tracks on RhythmParty this week</h6>
                  <SongCard/>
                  <ArtistCard/>
                   <div className='flex items-baseline mt-4 justify-between pt-12'>
                    <p className='text-white font-bold text-2xl '>Trending</p>
                    <span className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</span>
                  </div>
                  <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-14 gap-y-6 '>
                    <Playlist urlImg='https://i.pinimg.com/564x/17/d8/ff/17d8ff4be178c4cddb05630000420910.jpg' playlistName="Taylor Swift" author='LuongLe' />
                    <Playlist urlImg='https://i1.sndcdn.com/artworks-W86AP4p4wNY1zuR5-tog6CQ-t500x500.jpg' playlistName='Ngot' author='QuocDung'/>
                    <Playlist urlImg='https://avatar-ex-swe.nixcdn.com/playlist/2023/05/25/5/3/5/f/1684996435586_500.jpg' playlistName='Yên' author='Hunter'/>
                    <Playlist urlImg='https://i1.sndcdn.com/artworks-uzmx8xPhbzlA3kjl-5oDvYA-t500x500.jpg' playlistName='Từng Quen' author='Wren Evans'/>
                  </div>
                </div>
                <div className='md:w-[30%] px-6'>
                  <RightSideBar/>
                </div>
     </div>
  )
}

export default MainContent
