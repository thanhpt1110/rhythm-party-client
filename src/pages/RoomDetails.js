import React, { useEffect } from 'react';
import SonginQueue from '../components/SonginQueue';
import MessageForm from '../components/ChatApp/MessageForm';
import ChatBox from '../components/ChatApp/ChatBox';
import { useMusicContext } from '../utils/MusicContext';
import { useParams } from 'react-router';
import { useState } from 'react';

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


];

const RoomDetails = () => {
  const { roomName } = useParams();
  const handleBackClick = () => {
    window.history.back();
  };
  const { setIsActive } = useMusicContext();

  useEffect(() => {
    setIsActive(false);
  }, []);

  return (
    <div className='w-screen h-screen flex overflow-hidden max-h-screen'>
      <div className="w-[70%] bg-black text-white">
        <div className='flex items-center text-3xl font-bold py-8 w-full gap-80'>
           <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl text-white rounded-full bg-slate-700 px-3 py-2 hover:bg-slate-600 ml-8"
            onClick={handleBackClick}
          ></i>
          <p className='border border-gray-700 py-4 px-10 text-white bg-gray-800 rounded'>{roomName}</p>
        </div>
        <p className='text-xl font-semibold ml-8 mb-2'>Chat Box</p>
        <div className='max-h-[70%] overflow-y-auto '>
          <ChatBox />
          <MessageForm />
        </div>
      </div>
      <div className="w-[30%] bg-black opacity-90 text-white px-8 pb-20">
        <div className='flex flex-row justify-between items-center'>
          <p className='my-8 font-bold text-xl'>Songs in Queue</p>
          <i className="ri-play-list-add-line hover:text-gray-500 cursor-pointer text-xl" onClick={()=>document.getElementById('my_modal_2').showModal()}></i>
        </div>
        <div className='h-screen overflow-y-auto max-h-screen '>
          {SonginQueueData.map((song, index) => (
            <SonginQueue
              key={index}
              urlImg={song.urlImg}
              NameSong={song.NameSong}
              Artist={song.Artist}
              backgroundSong="#181818"
            />
          ))}
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-[#1f2937] text-white pb-16 ">
          <h3 className="font-bold text-2xl my-8">Add your song to Queue!</h3>
          <input type="text" placeholder='Search for a song to queue...' className='bg-[#1f2937] border border-gray-400 w-full py-2 px-3 rounded' />
           <div className='mt-8 grid grid-cols-2 gap-x-4 '>
                {SonginQueueData.slice(0, 4).map((song, index) => (
                  <SonginQueue
                    key={index}
                    urlImg={song.urlImg}
                    NameSong={song.NameSong}
                    Artist={song.Artist}
                    backgroundSong="#2B3440"
                  />
                ))}
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RoomDetails;
