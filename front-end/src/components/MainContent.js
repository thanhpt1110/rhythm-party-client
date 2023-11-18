import React, { useState } from 'react'
import SongCard from './SongCard'
import ArtistCard from './ArtistCard'
import Playlist from './Playlist'
import FavSongs from './FavSongs'

 const TopsongsData = [
    {
      SongImg: 'https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/2/f/a/7/2fa7217d7ba558e5f9ab43b267e7de5e.jpg',
      SongName: 'Từng Quen',
      SongArtist: 'Wren Evans'
    },
    {
      SongImg: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/c/4/b/0/c4b0da67bae11731685f79432dc462b7.jpg',
      SongName: 'Một Đêm Say',
      SongArtist: 'Thịnh Suy'
    },
    {
      SongImg: 'https://i.ytimg.com/vi/tRFLs_-54gE/maxresdefault.jpg',
      SongName: 'Love Story',
      SongArtist: 'Taylor Swift'
    },
    {
      SongImg: 'https://i1.sndcdn.com/artworks-0aDqhBAzd6pkEtIU-eJ1E1Q-t500x500.jpg',
      SongName: 'Tự Sự',
      SongArtist: 'Obito ft MCK'
    },
    {
      SongImg: 'https://avatar-ex-swe.nixcdn.com/song/2023/04/19/d/2/5/3/1681879735020_640.jpg',
      SongName: 'Không Thể Say',
      SongArtist: 'HieuThuHai'
    },
    {
      SongImg: 'https://cafebiz.cafebizcdn.vn/2019/12/23/all-i-want-for-christmas-is-you-15770727420652046746371.jpg',
      SongName: 'All I Want for Christmas Is You',
      SongArtist: 'Mariah Carey'
    }
  ];
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
  const [showFavSongs, setShowFavSongs] = useState(false);
  const handleToggleFavSongs = () => {
    setShowFavSongs(!showFavSongs);
  };
  return (
     <div className=' py-20 max-w-screen-xl md:flex flex-wrap justify-between mx-auto p-4 text-white'>
                <div>
                  <button onClick={handleToggleFavSongs}>
            {showFavSongs ? 'Unmount FavSongs' : 'Mount FavSongs'}
          </button>
          {showFavSongs && <FavSongs />}
                  <div className='flex items-baseline justify-between pt-12'>
                    <p className='text-white font-bold text-2xl mb-4 '>Top Songs</p>
                    <span className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</span>
                  </div>
                  <h6 className='text-gray-400 text-[14px] pb-4'>The most played tracks on RhythmParty this week</h6>
                   <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                      {TopsongsData.map((song, index) => (
                        <SongCard
                          key={index}
                          SongImg={song.SongImg}
                          SongName={song.SongName}
                          SongArtist={song.SongArtist}
                        />
                      ))}
                   </div>
                  <ArtistCard />
                   <div className='flex items-baseline mt-8 justify-between pt-12'>
                    <p className='text-white font-bold text-2xl '>Trending</p>
                    <span className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</span>
                  </div>
                  <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                    {TrendingData.slice(0, 6).map((playlist, index) => (
                      <Playlist
                        key={index}
                        urlImg={playlist.urlImg}
                        playlistName={playlist.playlistName}
                        author={playlist.author}
                      />
                    ))}
                  </div>
                </div>

     </div>
  )
}

export default MainContent
