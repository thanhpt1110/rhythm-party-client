import React ,{useEffect , useState} from 'react'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext';
import { useMusicContext } from '../utils/MusicContext';
import { useNavigate } from "react-router-dom";
import SongCard from '../components/SongCard';
import api from '../api/Api';

const AllUploadSongs = () => {
  const navigate = useNavigate();
  const {authUser, setAuthUser} = useAuth();
  const {music, setIsActive} = useMusicContext();
  const [uploadSongs, setUploadSongs] = useState([]);
  const handleBackClick = () => {
    window.history.back();
  };
  useEffect(()=>{
    const getMusic = async() => await api.get('/api/music').then(respone=>{
      if(respone.status===200)
        {
            const musics = respone.data.data;
            setUploadSongs(musics)
        }
      else if(respone.status === 401)
      {
          setAuthUser(null);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
    getMusic()
  },[])
  useEffect(()=>{
    if(music!==null && music !==undefined)
      setIsActive(true)
    else
      setIsActive(false)
  },[music])
  useEffect(()=>{
    if(authUser===null)
      navigate('/')
  },[authUser])

  return (
    <div>
            <Header />
            <div className='py-20 bg-black opacity-90 text-white '>
                <div className='max-w-screen-xl mx-auto py-16 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-16'>All Recent Playlists</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {uploadSongs.map((song, index) => (
                            <SongCard
                                  key={index}
                                  song = {song}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AllUploadSongs
