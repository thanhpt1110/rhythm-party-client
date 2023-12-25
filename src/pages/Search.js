import Header from '../components/Header'
import { Link } from 'react-router-dom'
import SongCard from '../components/SongCard'
import { useState, useEffect } from 'react'
import api from '../api/Api'
import Playlist from '../components/Playlist'


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
    urlImg: 'https://bazaarvietnam.vn/wp-content/uploads/2023/12/Harpers-Bazaar-Wren-Evans-ra-mat-album-Loi-Choi_04-scaled.jpg',
    playlistName: 'Loi Choi',
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


const Search = () => {
  const [topsongsData, setTopSongsData] = useState([]);
  useEffect(()=>{
    api.get('/api/music/top-music?quantity=20&index=0').then(respone=>{
      console.log(respone)
      if(respone.status===200)
        {
            const musics = respone.data.data;
            setTopSongsData(musics)
        }
    }).catch(error => {
    console.error('Error:', error);
  });
  },[])
  return (
    <div>
       <Header />
        <div className='py-16 bg-black opacity-90 text-white w-full h-full'>
            <div className='py-10 max-w-screen-xl  mx-auto px-4 '>
              <p className='font-bold text-gray-400 text-3xl'>Search results for "aaaa"</p>
              <div className='flex items-baseline justify-between pt-12'>
                    <p className=' font-bold text-2xl mb-4 '> Songs</p>
              </div>
               <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                      {topsongsData.slice(0, 6).map((song, index) => (
                        <SongCard
                          key={index}
                          song = {song}
                        />
                      ))}
                </div>
                <div className='flex items-baseline justify-between pt-12'>
                    <p className=' font-bold text-2xl mb-4 '> Playlist/Album</p>

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
    </div>
  )
}

export default Search
