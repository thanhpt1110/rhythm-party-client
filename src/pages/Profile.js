import React, {useEffect} from 'react'
import Header from '../components/Header'
import Player from '../components/Player'
import Playlist from '../components/Playlist'
import ArtistFav from '../components/ArtistFav'
import { useMusicContext } from '../utils/MusicContext'
import { storage } from '../utils/Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {useRef, useState} from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import SongCard from '../components/SongCard'
import { useNavigate } from "react-router-dom";
import api from '../api/Api'
import { updateUserInfromation } from '../api/UserApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import {createPlaylist,addMusicToPlaylist,removeMusicFromPlaylist,getPlaylistCurrentUser} from '../api/PlaylistApi'
const playlistsData = [
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

const Profile = () => {
  const fileInputRef = useRef(null);
  const {authUser, setAuthUser} = useAuth();
  const [listPlaylist, setListPlaylist] = useState([])
  const navigate = useNavigate();
  const [isLoadingMusic, setIsLoadingMusic] = useState(true)
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true)
  const [playlistName, setPlaylistName] = useState('');
  const [selectedPlaylistPrivacy, setSelectedPlaylistPrivacy] = useState("Private");
  const [isEnableCreatePlaylist, setIsEnableCreatePlaylist] = useState(true);
  const [image, setImage] = useState(authUser.avatar);
  const handleImageClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const uploadFile = (folder, file, id) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(storage, `${folder}/${`${id}.mp3`}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            alert(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(`URL: ${downloadURL}`);
              resolve(downloadURL);
            });
          }
        );
      }
    });
  };
  const handleImageChange = async (event) => {
    try{
      const newAvatar = await uploadFile("user_avatar",event.target.files[0],authUser._id);
      const updateUser = {avatar: newAvatar};
      const newUser = await updateUserInfromation(updateUser,authUser._id);
      setAuthUser(newUser.data.data);
      setImage(event.target.files[0]);
      toast.success("Avatar update successful!");
    }
    catch(e)
    {
    }
  };
  const handleCloseModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal) {
      modal.close();
    }
  };
  const handleChangePlaylistName = (e)=>{
    setPlaylistName(e.target.value)
  }
  const {music, setIsActive,updatePlaylist,setUpdatePlaylist} = useMusicContext();
  const [uploadSongs, setUploadSongs] = useState([]);
  const handleRadioChange = (event) => {
    setSelectedPlaylistPrivacy(event.target.id);
  };
  const handlePlaylistOnclick = async (e)=>{
    try{
      if(isEnableCreatePlaylist)
      {
        setIsEnableCreatePlaylist(false)
        const playlist = {
          playlistName: playlistName,
          privacyStatus: selectedPlaylistPrivacy
        }
        const respone = await createPlaylist(playlist);
        console.log(respone)
        setListPlaylist([respone.data.data, ...listPlaylist]);
        setIsEnableCreatePlaylist(true)
        setUpdatePlaylist(!updatePlaylist)
        handleCloseModal()
      }
    }
    catch(e)
    {
      console.log(e)
    }

  }
  const handleAddPlaylist = ()=>{
    setSelectedPlaylistPrivacy("Private");
    setPlaylistName("");
    document.getElementById('my_modal_3').showModal()}
  useEffect(()=>{
    const getMusic = async() => await api.get('/api/music').then(respone=>{
      if(respone.status===200)
        {
            const musics = respone.data.data;
            setUploadSongs(musics)
            setIsLoadingMusic(false)
        }
      else if(respone.status === 401)
      {
          setAuthUser(null);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
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
      }
    }
    if(isLoadingMusic)
      getMusic()
    if(isLoadingPlaylist)
      getPlaylist()

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
    (isLoadingMusic && isLoadingPlaylist) ? (
      <div>
          <span class="loader"></span>
      </div>) :(
    <div className=''>
      <Header />
      <div className='py-16 bg-black opacity-90'>
         <ToastContainer position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              className=''
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark" />
        <div >
          <div className="relative bg-slate-400">
            <div className=" h-72 w-full bg-cover bg-center bg-gradient-to-b from-transparent to-[#181818]">
            </div>
            <div className="absolute top-1/2 ml-32 transform -translate-y-1/2 items-center flex flex-row ">
              <div className="relative ">
                {
                authUser.avatar ? <img src={authUser.avatar} alt='avatar' className="h-44 w-44 rounded-full object-cover"
                />
                : <img src='https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg' alt='avatar' className='"h-44 w-44 rounded-full object-cover'/>
                }
                <button className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 bg-slate-500 hover:opacity-100 transition duration-300 ease-in-out px-6 py-1 rounded text-white flex flex-row gap-2"
                       onClick={handleImageClick}
                >
                  <i class="ri-camera-line"></i>
                  Update
                </button>
                 <input type='file'
                onChange={handleImageChange}
                accept='image/*'
                style={
                  {display: 'none'}
                }
                ref={fileInputRef}/>
              </div>
              <div className=' absolute  ml-56  w-96  py-2 text-white'>
                <p>Profile</p>
                <p className='font-bold text-3xl'>{authUser.displayName}</p>
              </div>
            </div>
          </div>
          <div className='max-w-screen-xl mx-auto p-4 h-full'>
              <div className='flex items-baseline mt-4 justify-between'>
              <div className='flex flex-row items-end gap-4'>
                  <p className='text-white font-bold text-2xl '>Your playlist</p>
                  <i className="ri-add-circle-fill text-white text-2xl cursor-pointer" onClick={handleAddPlaylist}></i>

              </div>
                 <Link to='/AllPlaylists' className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</Link>
              </div>
              <p className='text-gray-400 text-[12px] mt-2'>Only visible for you</p>
              <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                {listPlaylist.slice(0, 6).map((playlist, index) => (
                  <Playlist
                    key={index}
                    urlImg={playlist.avatarPlaylist}
                    playlistName={playlist.playlistName}
                    author={playlist.ownerPlaylistID.displayName}
                  />
                ))}

              </div>
              <div className='flex items-baseline mt-8 justify-between'>
                <div className='flex flex-col gap-2'>
                  <p className='text-white font-bold text-2xl '>Your upload songs</p>
                  <p className='text-gray-400 text-[12px]'>Only visible for you</p>
                </div>
                 <Link to='/AllUploadSongs' className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</Link>
              </div>
              <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                {uploadSongs.slice(0, 6).map((song, index) => (
                  <SongCard
                    key={index}
                    song = {song}
                    listOfSong={uploadSongs}
                  />
                ))}
            </div>
          </div>
        </div>
        <dialog id="my_modal_3" className="modal text-white">
                <div className="modal-box bg-[#1f2937]">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost hover:bg-slate-600 absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-xl text-center pt-2">Create new PlayList!</h3>
                  <div className='flex flex-row gap-2 items-center '>
                    <p className='py-4 font-semibold'>Playlist Title</p>
                    <span className='text-red-600'>*</span>
                  </div>
                  <input type="text" value={playlistName} onChange={handleChangePlaylistName} className='w-full rounded py-[6px] bg-[#1f2937] border border-gray-400 px-4' required />
                  <div className='flex flex-row gap-2 items-center '>
                    <p className='py-4 font-semibold'>Privacy</p>
                    <span className='text-red-600'>*</span>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <div >
                      <input type="radio" name="visibility" id="Public"/>
                      <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300 "
                      checked={selectedPlaylistPrivacy === "Public"} onChange={handleRadioChange}>Public</label>
                    </div>
                    <div>
                    <input type="radio" name="visibility" id="Private" checked={selectedPlaylistPrivacy === "Private"} onChange={handleRadioChange}/>
                      <label htmlFor="Private" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300">Private</label>
                    </div>
                    <p className='ml-7 text-[10px] text-gray-400'>Only you and people share a secret link with will be able to listen to this track</p>
                  </div>
                  <button className='w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 rounded-xl mt-10 mb-2'
                  onClick={handlePlaylistOnclick}>Create</button>
                </div>
        </dialog>
      </div>
    </div>
  ))
}

export default Profile
