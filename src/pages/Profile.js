import React from 'react'
import Header from '../components/Header'
import Player from '../components/Player'
import Playlist from '../components/Playlist'
import ArtistFav from '../components/ArtistFav'
import {useRef, useState} from 'react';
import { Link } from 'react-router-dom'
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
const artistsData = [
  {
    urlImg: 'https://ss-images.saostar.vn/w800/pc/1680851009890/saostar-2ka5fti72hsf2wck.jpeg',
    ArtistName: 'IU',
    role: 'Artist'
  },
  {
    urlImg: 'https://cdn.tuoitre.vn/thumb_w/640/471584752817336320/2023/2/13/tieu-su-ca-si-rose-blackpink-12-167628252304049682913.jpg',
    ArtistName: 'Rose',
    role: 'Artist'
  },
  {
    urlImg: 'https://www.rappler.com/tachyon/2021/12/Screen-Shot-2021-12-17-at-2.23.27-PM.png',
    ArtistName: 'Charlie Puth',
    role: 'Artist'
  },
  {
    urlImg: 'https://vcdn1-giaitri.vnecdn.net/2020/12/22/EdSheeran-1608608466-4639-1608608573.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=yXB5BHHa0ts49EPE0f-WrQ',
    ArtistName: 'Ed Sheeran',
    role: 'Artist'
  },
  {
    urlImg: 'https://tieusu.com/wp-content/uploads/2023/06/tieu-su-ca-si-Phuong-Ly-4.jpg',
    ArtistName: 'Phuong Ly',
    role: 'Artist'
  },
  {
    urlImg: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/9/11/1240204/Lyly3.jpg',
    ArtistName: 'LyLy',
    role: 'Artist'
  },
  // Thêm các nghệ sĩ khác vào đây
];


const Profile = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <div className=''>
      <Header />
      <div className='py-16 bg-black opacity-90'>
        <div >
          <div className="relative bg-slate-400">
            <div className=" h-72 w-full bg-cover bg-center bg-gradient-to-b from-transparent to-[#181818]">
            </div>
            <div className="absolute top-1/2 ml-32 transform -translate-y-1/2 items-center flex flex-row ">
              <div className="relative ">

                {
                image ? <img src={URL.createObjectURL(image)} alt='' className="h-44 w-44 rounded-full"
                />
                : <img src='https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg' alt='' className='"h-44 w-44 rounded-full'/>

                }

                <button className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 bg-slate-500 hover:opacity-100 transition duration-300 ease-in-out px-6 py-1 rounded text-white flex flex-row gap-2"
                        onClick={handleImageClick}
                >
                  <i class="ri-camera-line"></i>
                  Update
                </button>
                 <input type='file'
                onChange={handleImageChange}
                accept='*/*'
                style={
                  {display: 'none'}
                }
                ref={fileInputRef}/>
              </div>
              <div className=' absolute  ml-56  w-40  py-2 text-white'>
                <p>Profile</p>
                <p className='font-bold text-3xl'>UserName</p>
              </div>
            </div>
          </div>
          <div className='max-w-screen-xl mx-auto p-4 h-full'>
              <div className='flex items-baseline mt-4 justify-between'>
                 <p className='text-white font-bold text-2xl '>Recent Playlists</p>
                 <Link to='/AllPlaylists' className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</Link>
              </div>
              <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                {playlistsData.slice(0, 6).map((playlist, index) => (
                  <Playlist
                    key={index}
                    urlImg={playlist.urlImg}
                    playlistName={playlist.playlistName}
                    author={playlist.author}
                  />
                ))}

              </div>
              <div className='flex items-baseline mt-8 justify-between'>
                <div className='flex flex-col gap-2'>
                  <p className='text-white font-bold text-2xl '>Top Artists</p>
                  <p className='text-gray-400 text-[12px]'>Only visible for you</p>
                </div>
                 <span className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</span>
              </div>
              <div className='text-white mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 '>
                {artistsData.slice(0, 6).map((artist, index) => (
                  <ArtistFav
                    key={index}
                    urlImg={artist.urlImg}
                    ArtistName={artist.ArtistName}
                    role={artist.role}
                  />
                ))}
              </div>
          </div>
        </div>
      </div>
      <Player/>
    </div>
  )
}

export default Profile
