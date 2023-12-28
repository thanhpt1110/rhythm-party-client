import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LOGO from '../assets/images/LOGO.png';
import SongsOfAlbum from '../components/SongsOfAlbum';
import { useMusicContext } from '../utils/MusicContext';
import { storage } from '../utils/Firebase';
import { ref, getDownloadURL, uploadBytesResumable,deleteObject } from "firebase/storage";
import Swal from 'sweetalert2';
import Error from '../components/Error';
import ErrorNotFound from '../components/ErrorNotFound';
import { getPlaylistById, updatePlaylistById , removeMusicFromPlaylist} from '../api/PlaylistApi';
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../utils/AuthContext';
import { deletePlaylistByID } from '../api/PlaylistApi';
import { useNavigate } from 'react-router-dom';
import PlaylistDefaulImg from '../assets/images/PlaylistDefaultImg.png'
import Footer from '../components/Footer';
const AlbumDetail = () => {
    const fileInputRef = useRef(null);
    const location = useLocation();
    const [playlist, setPlaylist] = useState(null);
    const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true);
    const [isNotFound,setIsNotFound] = useState(false);
    const [isError,setIsError] = useState(false);
    const  {id} = useParams();
    const [isOwner, setIsOwner] = useState(false)
    const [listMusic, setListMusic] = useState([])
    const [playlistName, setPlaylistName] = useState('');
    const [selectedPlaylistPrivacy, setSelectedPlaylistPrivacy] = useState("");
    const [isEnableUpdatePlaylist, setIsEnableUpdatePlaylist] = useState(true);
    const navigate =useNavigate();
    const handleChangePlaylistName = (e)=>{
      e.preventDefault()
      setPlaylistName(e.target.value)
    }
    const {authUser} = useAuth();
    const handleBackClick = () => {
        window.history.back();
    };
    const handleUpdateImageClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const uploadFile = (folder, file, id) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(storage, `${folder}/${`${id}.png`}`);
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
  const deletefile = async(filePath, fileType) =>{
    const path = `${filePath}/${id}.${fileType}`;
    const objectRef = ref(storage, path);
    return await deleteObject(objectRef);
    }
  useEffect(()=>{
    const getPlaylist = async()=>{
      const respone = await getPlaylistById(id);

      if(respone.status === 404)
      {
        setIsNotFound(true)
        setIsLoadingPlaylist(false);
        return;
      }
      if(respone.status !==200)
      {
        setIsError(true);
        setIsLoadingPlaylist(false);
        return;
      }
      const playlistRes = respone.data.data
      console.log(playlistRes)
      if(playlistRes.privacyStatus === "Private" )
      {
        if(!authUser || authUser._id !== playlistRes.ownerPlaylistID._id)
        {
          setIsNotFound(true)
          setIsLoadingPlaylist(false);
          return;
        }
      }
      if((!authUser || authUser._id!==playlistRes.ownerPlaylistID._id))
      {
        playlistRes.listMusic = playlistRes.listMusic.filter(music => music.musicPrivacyType === "Public" && music.musicAuthorize === "Authorize")
      }
      if(authUser && playlistRes.ownerPlaylistID._id === authUser._id)
        setIsOwner(true)
      setPlaylist(playlistRes);
      setListMusic(playlistRes.listMusic);
      setPlaylistName(playlistRes.playlistName);
      setSelectedPlaylistPrivacy(playlistRes.privacyStatus);
      setIsLoadingPlaylist(false);
    }
    if(isLoadingPlaylist)
      getPlaylist();
  },[])
  const handleDeleteUploadSong = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert all this album!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) {
               await deletePlaylistByID(playlist._id)
              if(playlist.avatarPlaylist)
                await deletefile("playlist_avatar","png")
                Swal.fire({
                title: "Deleted!",
                text: "Your album has been deleted.",
                icon: "success"
                });
               navigate('/profile')

            }
            });
    };
    const handleDeleteMusic = async(song) =>{
      await removeMusicFromPlaylist(song._id,playlist._id);
      playlist.listMusic = playlist.listMusic.filter(musicSingle => musicSingle._id !== song._id);
      setListMusic(playlist.listMusic)
      Swal.fire({
        title: "Deleted!",
        text: "Your song has been deleted.",
        icon: "success"
        });
    }
    const handleImageChange = async (event) => {
      try{
        const newImg = await uploadFile("playlist_avatar",event.target.files[0],playlist._id);
        const updatePlaylist = {avatarPlaylist: newImg};
        const newPlaylist = await updatePlaylistById(updatePlaylist,playlist._id);
        setPlaylist(newPlaylist.data.data);
        // setImage(event.target.files[0]);
        toast.success("Music image update successful!");
      }
      catch(e)
      {
        toast.error("Change image failed");
        console.log(e)
      }
    }
    const handleClickCloseButton = (e)=>{
      e.preventDefault();
      handleCloseModal();
    }
    const {music, setIsActive} = useMusicContext();
    useEffect(()=>{
      if(music!==null && music !==undefined)
        setIsActive(true)
      else
        setIsActive(false)
    },[music])
    const handleRadioChange = (event) => {
      setSelectedPlaylistPrivacy(event.target.id);
    };
    const handleCloseModal = () => {
      const modal = document.getElementById('my_modal_3');
      if (modal) {
        modal.close();
      }
    };
    const handlePlaylistOnclick = async (e)=>{
      e.preventDefault()
      try{
        if(isEnableUpdatePlaylist)
        {
          setIsEnableUpdatePlaylist(false)
          const playlistUpdate = {
            playlistName: playlistName,
            privacyStatus: selectedPlaylistPrivacy
        }
          const respone = await updatePlaylistById(playlistUpdate,playlist._id);
          setPlaylist(respone.data.data);
          setIsEnableUpdatePlaylist(true);
          handleCloseModal();
          toast.success("Update music successfully");

        }
      }
      catch(e)
      {
        console.log(e)
      }

    }
    return (
      isLoadingPlaylist? (
        <div className='text-center w-screen h-screen py-60'>
          <span className="loader h-20 w-20 "></span>
        </div> ) : isError ? (<Error/>) : isNotFound ? (<ErrorNotFound/>):
        (<div>
            <Header />

            <div className='py-20 bg-black opacity-90 text-white w-full h-full'>
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
                <div className='relative bg-[#9890A0] '>
                    <div className=' h-[22rem] bg-cover bg-center bg-gradient-to-b from-transparent to-[#181818]'></div>
                    <div className='absolute top-1/2 ml-24 transform -translate-y-1/2 items-center flex flex-row '>
                        <div className='relative flex flex-row gap-6 '>
                            <div className='mr-6 px-2 py-2 rounded-full'>
                                <i
                                    className='ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 '
                                    onClick={handleBackClick}
                                ></i>
                            </div>

                            <div className="relative">
                                <img
                                  src={playlist.avatarPlaylist ? playlist.avatarPlaylist : PlaylistDefaulImg}
                                  alt="AlbumImg"
                                  className="h-60 w-60 rounded shadow-2xl shadow-black object-cover "
                                />
                                {isOwner && (<button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 bg-slate-500 hover:opacity-100 transition duration-300 ease-in-out px-8 py-1 rounded-xl text-white flex flex-row gap-2 text-sm items-center" onClick={handleUpdateImageClick}>
                                  <i className="ri-camera-line text-lg"></i>
                                  Update
                                </button>)}
                                <input type='file'
                                  onChange={handleImageChange}
                                  accept='image/*'
                                  style={
                                    {display: 'none'}
                                  }
                                  ref={fileInputRef}/>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <p className='text-sm font-semibold'>
                                    Playlist
                                </p>
                                <p className='font-bold text-[80px]'>
                                    {playlist && playlist.playlistName}
                                </p>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-sm font-semibold'>
                                        {playlist.ownerPlaylistID.displayName}
                                    </p>
                                    <div className='flex flex-row gap-96 items-center justify-between '>
                                        <div className='flex flex-row gap-1 items-center'>
                                          <img
                                            src={LOGO}
                                            alt='logo'
                                            className='h-8 w-8'
                                          />
                                          <p className='text-xs'>
                                              <b>Rhythm Party - {listMusic.length} songs</b>
                                          </p>
                                        </div>
                                        {isOwner &&(<div className='btnEditDelete flex flex-row gap-2'>
                                            <button className='flex flex-row gap-2 items-center border px-3 py-[3px] border-gray-400 rounded hover:border-gray-300 ' onClick={()=>document.getElementById('my_modal_3').showModal()}>
                                                <i className="ri-pencil-fill"></i>
                                                <p className='text-xs font-semibold ' >Edit</p>
                                            </button>
                                            <button className='flex flex-row gap-2 items-center border px-2 py-[3px] border-gray-400 rounded hover:border-gray-300 '  onClick={handleDeleteUploadSong}>
                                                <i className="ri-delete-bin-6-line"></i>
                                                <p className='text-xs font-semibold '>Delete</p>
                                            </button>
                                        </div>)}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-1 pb-28 text-white bg-black mt-10'>
                  {listMusic.map((music,i) =>(
                    <SongsOfAlbum key={music._id}
                    song = {music}
                    listOfSong = {playlist.listMusic}
                    order={i}
                    isOwner = {isOwner}
                    onDeleteMusic = {()=>{handleDeleteMusic(music)}}/>
                  ))}
                </div>
                <dialog id="my_modal_3" className="modal text-white">
                <div className="modal-box bg-[#1f2937]">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost hover:bg-slate-600 absolute right-2 top-2" onClick={handleClickCloseButton}>✕</button>
                    <h3 className="font-bold text-xl text-center pt-2">Update PlayList!</h3>
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
                      <input type="radio" name="visibility" id="Public" checked={selectedPlaylistPrivacy === "Public"} onChange={handleRadioChange}/>
                      <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300 "
                      >Public</label>
                    </div>
                    <div>
                    <input type="radio" name="visibility" id="Private" checked={selectedPlaylistPrivacy === "Private"} onChange={handleRadioChange}/>
                      <label htmlFor="Private" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300">Private</label>
                    </div>
                    <p className='ml-7 text-[10px] text-gray-400'>Only you and people share a secret link with will be able to listen to this track</p>
                  </div>
                  <button className='w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 rounded-xl mt-10 mb-2'
                  onClick={handlePlaylistOnclick}>Update</button>
                  </form>

                </div>
                </dialog>
            </div>
            <Footer/>
        </div>
    ));
};

export default AlbumDetail;
