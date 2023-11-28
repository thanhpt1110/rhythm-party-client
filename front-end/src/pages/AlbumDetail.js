import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import LOGO from '../assets/images/LOGO.png';
import SongsOfAlbum from '../components/SongsOfAlbum';
import Player from '../components/Player';
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
    const location = useLocation();
    const AlbumName = decodeURIComponent(
        location.pathname.replace('/playlist-detail/', '')
    );
    const handleBackClick = () => {
        window.history.back();
    };
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
                            <img
                                src='https://seed-mix-image.spotifycdn.com/v6/img/artist/4GJ6xDCF5jaUqD6avOuQT6/vi/default'
                                alt='AlbumImg'
                                className='"h-60 w-60 rounded shadow-2xl shadow-black'
                            />
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
            </div>
            <Player/>
        </div>
    );
};

export default AlbumDetail;
