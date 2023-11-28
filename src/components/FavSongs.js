import React from 'react'
import Playlist from './Playlist'

const FavSongsData = [
  {
    urlImg: 'https://bazaarvietnam.vn/wp-content/uploads/2023/10/HBVN-binz-xuan-dan-hit-me-up.jpg',
    playlistName: 'Hit Me Up',
    author: 'Binz'
  },
  {
    urlImg: 'https://i1.sndcdn.com/artworks-yOf4Rf5XXfb35JFR-CGdrMw-t500x500.jpg',
    playlistName: 'Hold On Tight',
    author: 'Aespa'
  },
  {
    urlImg: 'https://avatar-ex-swe.nixcdn.com/song/2022/02/09/c/e/0/1/1644402723076_640.jpg',
    playlistName: 'Christmas Tree',
    author: 'V'
  },
  {
    urlImg: 'https://i.ytimg.com/vi/ISAKquo_whg/maxresdefault.jpg',
    playlistName: 'Hồi Ức',
    author: 'Phan Mạnh Quỳnh'
  },
  {
    urlImg: 'https://images2.thanhnien.vn/528068263637045248/2023/10/9/poster-16968609330411397347070.jpg',
    playlistName: 'Bài ca đất phương Nam',
    author: 'Đức Trí'
  },
  {
    urlImg: 'https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/2/8/e/2/28e2688372cbd8efa2ba3b35a7432bd1.jpg',
    playlistName: 'Champions',
    author: 'Obito'
  },
  // Thêm các playlist khác vào đây
];
const FavSongs = () => {

  return (
    <div>
       <div className='flex items-baseline justify-between '>
          <div className='flex flex-row gap-2 items-baseline'>
            <p className='text-white font-bold text-2xl mb-4 '>Favourite Songs</p>
            <i class="ri-heart-3-fill"></i>
          </div>
          <span className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</span>
        </div>
       <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
        {FavSongsData.slice(0, 6).map((playlist, index) => (
        <Playlist
          key={index}
          urlImg={playlist.urlImg}
          playlistName={playlist.playlistName}
          author={playlist.author}
        />
      ))}
      </div>
    </div>
  )
}

export default FavSongs