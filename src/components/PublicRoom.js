import React from 'react'
import { useNavigate } from 'react-router-dom';
import RoomDefaultImg from '../assets/images/PlaylistDefaultImg.png'
const PublicRoom = ({room}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room-detail/${room._id}`);
  };
  return (
  <div className='flex '>
      <div className='bg-[#181818] w-full text-white flex items-center flex-col gap-4 cursor-pointer hover:bg-gray-800 rounded-lg py-2 px-4' onClick={handleClick}>
      <p className='text-[30px] pt-8 font-bold'>{room.roomName}</p>
        <div className='h-48 w-48 object-cover'>
        <img src={RoomDefaultImg}
        alt="RoomImage" className='h-48 w-48 object-cover'/>
      </div>
     <div className='flex flex-col gap-2 items-center'>
        <p className='font-semibold text-lg'>Room ID</p>
        <p className='text-sm font-semibold pb-4 text-gray-400 cursor-not-allowed'>{room._id}</p>
     </div>
    </div>
  </div>

  );
};

export default PublicRoom;

