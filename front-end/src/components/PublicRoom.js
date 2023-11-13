import React from 'react'


const PublicRoom = ({ roomName, urlImg, song, artist }) => {
  return (
  <div className='flex '>
      <div className='bg-[#181818] w-full text-white flex items-center flex-col gap-4 cursor-pointer hover:bg-gray-800 rounded-lg py-2 px-4'>
      <h2 className='text-3xl pt-8 font-bold'>{roomName}</h2>
      <div className='w-40 h-40'>
        <img src={urlImg} alt="SongImage" />
      </div>
      <p className='font-semibold text-lg'>{song}</p>
      <p className='text-base pb-4'>{artist}</p>
    </div>
  </div>

  );
};

export default PublicRoom;

