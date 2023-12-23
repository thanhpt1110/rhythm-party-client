import React,{ useEffect , useState } from 'react'
import Header from '../components/Header';
import Player from '../components/Player';
import { useMusicContext } from '../utils/MusicContext';
import SongCard from '../components/SongCard';
import api from '../api/Api'


const AllTopSong = () => {
  const [topsongsData, setTopSongsData] = useState([]);
  useEffect(()=>{
    api.get('/api/music/top-music?quantity=20&index=0').then(respone=>{
      if(respone.status===200)
        {
            const musics = respone.data.data;
            setTopSongsData(musics)
        }
    })
  },[])

   const handleBackClick = () => {
    window.history.back();
  };
  const {music, setIsActive} = useMusicContext();
  useEffect(()=>{
    if(music!==null && music !==undefined)
      setIsActive(true)
    else
      setIsActive(false)
  },[music])
  return (
    <div>
            <Header />
            <div className='py-16 bg-black opacity-90 text-white'>
                <div className='max-w-screen-xl mx-auto py-20 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-8'>All Top Songs</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {
                        topsongsData.map((topsong, index) => (
                            <SongCard
                                key={index}
                                song = {topsong}
                                listOfSong={topsongsData}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AllTopSong
