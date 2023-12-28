import {useState, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Playlist from '../components/Playlist';
import { getTop20Playlist } from '../api/PlaylistApi'


const AllAlbum = () => {
   const handleBackClick = () => {
    window.history.back();
  };
  const [topPlaylistData, setTopPlaylistData] = useState([]);
  const [isLoadingTopPlaylist, setIsLoadingTopPlaylist] = useState(true);
  useEffect(()=>{
    const getPlaylist = async()=>{
      const respone = await getTop20Playlist();
      const playlists = respone.data.data;
      console.log(respone)
      setTopPlaylistData(playlists);
      setIsLoadingTopPlaylist(false);
    }
    if(isLoadingTopPlaylist)
      getPlaylist();

  },[])
  return (
    <div>
      <Header />
      <div className='py-20 bg-black opacity-90 text-white'>
                <div className='max-w-screen-xl mx-auto py-20 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-10'>All Albums</p>
                    <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                    {topPlaylistData.map((playlist, index) => (
                      <Playlist
                        key={index}
                        playlist={playlist}
                      />
                    ))}
                  </div>
                </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AllAlbum
