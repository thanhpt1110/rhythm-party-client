import React from 'react';
import Header from '../components/Header';
import Playlist from '../components/Playlist';
import Player from '../components/Player';

const playlistsData = [
    {
        urlImg: 'https://i.pinimg.com/564x/17/d8/ff/17d8ff4be178c4cddb05630000420910.jpg',
        playlistName: 'Taylor Swift',
        author: 'LuongLe',
    },
    {
        urlImg: 'https://i1.sndcdn.com/artworks-W86AP4p4wNY1zuR5-tog6CQ-t500x500.jpg',
        playlistName: 'Ngot',
        author: 'QuocDung',
    },
    {
        urlImg: 'https://avatar-ex-swe.nixcdn.com/playlist/2023/05/25/5/3/5/f/1684996435586_500.jpg',
        playlistName: 'Yên',
        author: 'Hunter',
    },
    {
        urlImg: 'https://i1.sndcdn.com/artworks-uzmx8xPhbzlA3kjl-5oDvYA-t500x500.jpg',
        playlistName: 'Từng Quen',
        author: 'Wren Evans',
    },
    {
        urlImg: 'https://i.scdn.co/image/ab67616d00001e02e50594eb6a3b518dcb78bf59',
        playlistName: 'Cá Hồi Hoang',
        author: 'PhuongAnh',
    },
    {
        urlImg: 'https://upload.wikimedia.org/wikipedia/vi/5/5f/Blackpink-_The_Album.png',
        playlistName: 'BlackPink',
        author: 'BlinkVN',
    },
    {
        urlImg: 'https://i.scdn.co/image/ab67616d00001e02e50594eb6a3b518dcb78bf59',
        playlistName: 'Cá Hồi Hoang',
        author: 'PhuongAnh',
    },
    {
        urlImg: 'https://upload.wikimedia.org/wikipedia/vi/5/5f/Blackpink-_The_Album.png',
        playlistName: 'BlackPink',
        author: 'BlinkVN',
    },
    {
        urlImg: 'https://i.pinimg.com/564x/17/d8/ff/17d8ff4be178c4cddb05630000420910.jpg',
        playlistName: 'Taylor Swift',
        author: 'LuongLe',
    },
    {
        urlImg: 'https://i1.sndcdn.com/artworks-W86AP4p4wNY1zuR5-tog6CQ-t500x500.jpg',
        playlistName: 'Ngot',
        author: 'QuocDung',
    },
    {
        urlImg: 'https://avatar-ex-swe.nixcdn.com/playlist/2023/05/25/5/3/5/f/1684996435586_500.jpg',
        playlistName: 'Yên',
        author: 'Hunter',
    },

];

export const AllPlaylist = () => {
   const handleBackClick = () => {
    window.history.back();
  };
    return (
        <div>
            <Header />
            <div className='py-16 bg-black opacity-90 text-white '>
                <div className='max-w-screen-xl mx-auto py-16 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-8'>All Recent Playlists</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {playlistsData.map((playlist, index) => (
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
            <Player/>
        </div>
    );
};
