import React, {useEffect , useState} from 'react';
import Header from '../components/Header';
import { useMusicContext } from '../utils/MusicContext';
import Playlist from '../components/Playlist';
import Footer from '../components/Footer';
import {getPlaylistCurrentUser} from '../api/PlaylistApi'
export const AllPlaylist = () => {

    const [listPlaylist, setListPlaylist] = useState([])
    const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true)
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
useEffect(()=>{
    const getPlaylist = async()=> {
      try{
        const respone = await getPlaylistCurrentUser();
        setListPlaylist(respone.data.data);
        console.log(respone)
        setIsLoadingPlaylist(false)
        localStorage.setItem('accessToken',respone.data.accessToken)
      }
      catch(e)
      {
        console.log(e)
        setIsLoadingPlaylist(false)
      }
    }
    if(isLoadingPlaylist)
      getPlaylist()

  },[])

    return (
        <div>
            <Header />
            <div className='py-20 bg-black opacity-90 text-white '>
                <div className='max-w-screen-xl mx-auto py-20 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-600 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-8'>All Recent Playlists</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {listPlaylist.map((playlist, index) => (
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
    );
};
