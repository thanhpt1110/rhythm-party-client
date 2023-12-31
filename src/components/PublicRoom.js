import React from 'react'
import { useNavigate } from 'react-router-dom';

const PublicRoom = ({room}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room-detail/${room._id}`);
  };
  return (
  <div className='flex '>
      <div className='bg-[#181818] w-full text-white flex items-center flex-col gap-4 cursor-pointer hover:bg-gray-800 rounded-lg py-2 px-4' onClick={handleClick}>
      <p className='text-[30px] pt-8 font-bold'>{room.roomName}</p>
        <div className='w-40 h-40'>
        <img src="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" 
        alt="SongImage" className='h-40 w-40 object-cover'/>
      </div>
      <p className='font-semibold text-lg'>Room ID</p>
      <p className='text-base pb-4 cursor-text'>{room._id}</p>
    </div>
  </div>

  );
};

export default PublicRoom;

