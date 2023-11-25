import React from 'react'
import { useLocation } from 'react-router-dom';
import Player from '../components/Player';
import { ChatEngine } from 'react-chat-engine'
import ChatFeed from '../components/ChatApp/ChatFeed';
import SonginQueue from '../components/SonginQueue';

  const SonginQueueData = [
  {
    urlImg: 'https://i.pinimg.com/564x/17/d8/ff/17d8ff4be178c4cddb05630000420910.jpg',
    NameSong: 'Taylor Swift',
    Artist: 'LuongLe'
  },
  {
    urlImg: 'https://i1.sndcdn.com/artworks-W86AP4p4wNY1zuR5-tog6CQ-t500x500.jpg',
    NameSong: 'Ngot',
    Artist: 'QuocDung'
  },
  {
    urlImg: 'https://avatar-ex-swe.nixcdn.com/playlist/2023/05/25/5/3/5/f/1684996435586_500.jpg',
    NameSong: 'Yên',
    Artist: 'Hunter'
  },
  {
    urlImg: 'https://i1.sndcdn.com/artworks-uzmx8xPhbzlA3kjl-5oDvYA-t500x500.jpg',
    NameSong: 'Từng Quen',
    Artist: 'Wren Evans'
  },
  {
    urlImg: 'https://i.scdn.co/image/ab67616d00001e02e50594eb6a3b518dcb78bf59',
    NameSong: 'Cá Hồi Hoang',
    Artist: 'PhuongAnh'
  },
  {
    urlImg: 'https://upload.wikimedia.org/wikipedia/vi/5/5f/Blackpink-_The_Album.png',
    NameSong: 'BlackPink',
    Artist: 'BlinkVN'
  },
  // Thêm các playlist khác vào đây
  ];
  const RoomDetails = () => {
  const location = useLocation();
  const roomName = decodeURIComponent(location.pathname.replace('/room-detail/', ''));
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className='w-full h-full bg-[#e5e7eb] flex'>
      <div className="w-[70%] bg-gray-300">
        <div className=' flex items-center text-3xl font-bold py-8 w-full justify-center'>
          <p className='border border-gray-700 py-4 px-10 text-white bg-gray-800 rounded'>{roomName}</p>
        </div>
        <i className="ri-arrow-left-s-line cursor-pointer text-2xl text-white rounded-full bg-slate-700 px-2 py-2 hover:bg-slate-600 ml-8 "
            onClick={handleBackClick}>
        </i>
        <div className='pt-8 pb-24'>
          <ChatEngine
            height='100vh'
            projectID='40ee95b5-89c9-429e-84d2-b4fb889a91e5'
            userName='QuocDung'
            userSecret='123456'
            renderChatFeed ={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
        </div>
        <Player/>
      </div>
      <div className="w-[30%] bg-black opacity-90 text-white px-8">
        <p className='my-8 font-bold text-xl'>Songs in Queue</p>
        <div>
          {SonginQueueData.slice(0, 6).map((songs, index) => (
                  <SonginQueue
                    key={index}
                    urlImg={songs.urlImg}
                    NameSong={songs.NameSong}
                    Artist={songs.Artist}
                  />
                ))}
        </div>
        <div className='text-center cursor-pointer'>
          <i className="ri-add-circle-fill text-3xl "></i>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails