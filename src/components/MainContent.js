import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import ArtistCard from './ArtistCard'
import Playlist from './Playlist'
import FavSongs from './FavSongs'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import api from '../api/Api'
import { getTop20Music } from '../api/MusicApi'
import { getTop20Playlist } from '../api/PlaylistApi'

const TrendingData = [
  {
    urlImg: 'https://i.pinimg.com/564x/17/d8/ff/17d8ff4be178c4cddb05630000420910.jpg',
    playlistName: 'Taylor Swift',
    author: 'LuongLe'
  },
  {
    urlImg: 'https://i1.sndcdn.com/artworks-W86AP4p4wNY1zuR5-tog6CQ-t500x500.jpg',
    playlistName: 'Ngot',
    author: 'QuocDung'
  },
  {
    urlImg: 'https://avatar-ex-swe.nixcdn.com/playlist/2023/05/25/5/3/5/f/1684996435586_500.jpg',
    playlistName: 'Yên',
    author: 'Hunter'
  },
  {
    urlImg: 'https://i1.sndcdn.com/artworks-uzmx8xPhbzlA3kjl-5oDvYA-t500x500.jpg',
    playlistName: 'Từng Quen',
    author: 'Wren Evans'
  },
  {
    urlImg: 'https://i.scdn.co/image/ab67616d00001e02e50594eb6a3b518dcb78bf59',
    playlistName: 'Cá Hồi Hoang',
    author: 'PhuongAnh'
  },
  {
    urlImg: 'https://upload.wikimedia.org/wikipedia/vi/5/5f/Blackpink-_The_Album.png',
    playlistName: 'BlackPink',
    author: 'BlinkVN'
  },
  // Thêm các playlist khác vào đây
];

const MainContent = () => {
  const [topPlaylistData, setTopPlaylistData] = useState([]);
  const [isLoadingTopPlaylist, setIsLoadingTopPlaylist] = useState(true);
  const [isLoadingTopSong, setIsLoadingTopSong] = useState(true);
  const [topsongsData, setTopSongsData] = useState([]);
  useEffect(()=>{
    const getMusic = async()=>{
      try{
      const respone = await getTop20Music();
      const musics = respone.data.data;
      setTopSongsData(musics);
      setIsLoadingTopSong(false);
      }
      catch(e)
      {
        console.log(e);
      }
    }
    const getPlaylist = async()=>{
      const respone = await getTop20Playlist();
      const playlists = respone.data.data;
      console.log(respone)
      setTopPlaylistData(playlists);
      setIsLoadingTopPlaylist(false);
    }
    if(isLoadingTopPlaylist)
      getPlaylist();
    if(isLoadingTopSong)
      getMusic();
  },[])
  const {authUser} = useAuth()
  return ( 
    (isLoadingTopSong || isLoadingTopPlaylist) ?
    (
      <div>
          <span class="loader"></span>
      </div>):
          (<div className=' py-20 max-w-screen-xl md:flex flex-wrap justify-between mx-auto p-4 text-white'>
                <div>
                {/* {authUser && <FavSongs />} */}
                  <div className='flex items-baseline justify-between pt-12'>
                    <p className='text-white font-bold text-2xl mb-4 '>Top Songs</p>
                    <Link to='/AllTopSongs' className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</Link>
                  </div>
                  <h6 className='text-gray-400 text-[14px] pb-4'>The most played tracks on RhythmParty this week</h6>
                   <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                      {topsongsData.slice(0, 6).map((song, index) => (
                        <SongCard
                          key={index}
                          song = {song}
                          listOfSong={topsongsData}
                        />
                      ))}
                   </div>
                  <ArtistCard />
                   <div className='flex items-baseline mt-8 justify-between pt-12'>
                    <p className='text-white font-bold text-2xl '>Trending Album</p>
                    <Link to='/AllAlbum' className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</Link>
                  </div>
                  <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                    {topPlaylistData.slice(0, 6).map((playlist, index) => (
                      <Playlist
                        key={index}
                        playlist={playlist}
                      />
                    ))}
                  </div>
                </div>
     </div>)
  )
}

export default MainContent
