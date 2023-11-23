import React from 'react'
import { useNavigate } from 'react-router-dom';

const PublicRoom = ({ roomName, urlImg, song, artist }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room-detail/${roomName}`);
  };

  return (
  <div className='flex '>
      <div className='bg-[#181818] w-full text-white flex items-center flex-col gap-4 cursor-pointer hover:bg-gray-800 rounded-lg py-2 px-4' onClick={handleClick}>
      <p className='text-[30px] pt-8 font-bold'>{roomName}</p>
        <div className='w-40 h-40'>
        <img src={urlImg} alt="SongImage" className='h-40 w-40 object-cover'/>
      </div>
      <p className='font-semibold text-lg'>{song}</p>
      <p className='text-base pb-4'>{artist}</p>
    </div>
  </div>

  );
};

export default PublicRoom;

