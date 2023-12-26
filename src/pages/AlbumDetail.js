import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LOGO from '../assets/images/LOGO.png';
import SongsOfAlbum from '../components/SongsOfAlbum';
import { useMusicContext } from '../utils/MusicContext';
import { storage } from '../utils/Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Swal from 'sweetalert2';

const SongsData = [
    {
      id: 1,
      SongImg: 'https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/2/f/a/7/2fa7217d7ba558e5f9ab43b267e7de5e.jpg',
      SongName: 'Từng Quen',
      SongArtist: 'Wren Evans',
      duration: '2:51',
    },
    {
      id: 2,
      SongImg: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/c/4/b/0/c4b0da67bae11731685f79432dc462b7.jpg',
      SongName: 'Một Đêm Say',
      SongArtist: 'Thịnh Suy',
      duration: '2:20',
    },
    {
      id: 3,
      SongImg: 'https://i.ytimg.com/vi/tRFLs_-54gE/maxresdefault.jpg',
      SongName: 'Love Story',
      SongArtist: 'Taylor Swift',
      duration: '3:05',
    },
    {
      id: 4,
      SongImg: 'https://i1.sndcdn.com/artworks-0aDqhBAzd6pkEtIU-eJ1E1Q-t500x500.jpg',
      SongName: 'Tự Sự',
      SongArtist: 'Obito ft MCK',
      duration: '4:10',
    },
    {
      id: 5,
      SongImg: 'https://avatar-ex-swe.nixcdn.com/song/2023/04/19/d/2/5/3/1681879735020_640.jpg',
      SongName: 'Không Thể Say',
      SongArtist: 'HieuThuHai',
      duration: '1:53',
    },
    {
      id: 6,
      SongImg: 'https://cafebiz.cafebizcdn.vn/2019/12/23/all-i-want-for-christmas-is-you-15770727420652046746371.jpg',
      SongName: 'All I Want for Christmas Is You',
      SongArtist: 'Mariah Carey',
      duration: '2:11',
    }
  ];

const AlbumDetail = () => {
    const fileInputRef = useRef(null);
    const location = useLocation();
    const AlbumName = decodeURIComponent(
        location.pathname.replace('/playlist-detail/', '')
    );
    const imageInputRef = useRef(null);
    const handleBackClick = () => {
        window.history.back();
    };
    const handleUpdateImageClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const handleDeleteUploadSong = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert all this album!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Deleted!",
                text: "Your album has been deleted.",
                icon: "success"
                });
            }
            });
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
            <div className='py-16 bg-black opacity-90 text-white w-full h-full'>
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
                                  src="https://seed-mix-image.spotifycdn.com/v6/img/artist/4GJ6xDCF5jaUqD6avOuQT6/vi/default"
                                  alt="AlbumImg"
                                  className="h-60 w-60 rounded shadow-2xl shadow-black "
                                />
                                <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 bg-slate-500 hover:opacity-100 transition duration-300 ease-in-out px-8 py-1 rounded-xl text-white flex flex-row gap-2 text-sm items-center" onClick={handleUpdateImageClick}>
                                  <i className="ri-camera-line text-lg"></i>
                                  Update
                                </button>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <p className='text-sm font-semibold'>
                                    Playlist
                                </p>
                                <p className='font-bold text-[80px]'>
                                    {' '}
                                    {AlbumName} Album
                                </p>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-sm font-semibold'>
                                        Artist Name in this Album
                                    </p>
                                    <div className='flex flex-row gap-96 items-center justify-between '>
                                        <div className='flex flex-row gap-1 items-center'>
                                          <img
                                            src={LOGO}
                                            alt='logo'
                                            className='h-8 w-8'
                                          />
                                          <p className='text-xs'>
                                              <b>Rhythm Party - 50 songs,</b> in 3
                                              hours
                                          </p>
                                        </div>
                                        <div className='btnEditDelete flex flex-row gap-2'>
                                            <button className='flex flex-row gap-2 items-center border px-3 py-[3px] border-gray-400 rounded hover:border-gray-300 ' onClick={()=>document.getElementById('my_modal_3').showModal()}>
                                                <i className="ri-pencil-fill"></i>
                                                <p className='text-xs font-semibold ' >Edit</p>
                                            </button>
                                            <button className='flex flex-row gap-2 items-center border px-2 py-[3px] border-gray-400 rounded hover:border-gray-300 '  onClick={handleDeleteUploadSong}>
                                                <i className="ri-delete-bin-6-line"></i>
                                                <p className='text-xs font-semibold '>Delete</p>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-1 pb-28 text-white bg-black mt-10'>
                  {SongsData.map((track,i) =>(
                    <SongsOfAlbum key={track.id}
                    track={track.SongName}
                    imgSong={track.SongImg}
                    artist={track.SongArtist}
                    duration={track.duration}
                    order={i}/>
                  ))}
                </div>
                 <dialog id="my_modal_3" className="modal text-white">
                <div className="modal-box bg-[#1f2937] ">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost hover:bg-slate-600 absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-xl text-center pt-2">Update PlayList</h3>
                  <div className='flex flex-row gap-2 items-center '>
                    <p className='py-4 font-semibold'>Playlist Title</p>
                    <span className='text-red-600'>*</span>
                  </div>
                  <input type="text" className='w-full rounded py-[6px] bg-[#1f2937] border border-gray-400 px-4' required />
                  <div className='flex flex-row gap-2 items-center '>
                    <p className='py-4 font-semibold'>Privacy</p>
                    <span className='text-red-600'>*</span>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <div >
                      <input type="radio" name="visibility" id="Public"/>
                      <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300 ">Public</label>
                    </div>
                    <div>
                    <input type="radio" name="visibility" id="Private"/>
                      <label htmlFor="Private" className="cursor-pointer py-2 px-4 rounded text-sm text-gray-300">Private</label>
                    </div>
                    <p className='ml-7 text-[10px] text-gray-400'>Only you and people share a secret link with will be able to listen to this track</p>
                  </div>
                  <button className='w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 rounded-xl mt-10 mb-2'>Save</button>
                </div>
                  </dialog>
            </div>
        </div>
    );
};

export default AlbumDetail;
