import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
const Playlist = ({urlImg,playlistName, author }) => {
    
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
    setIsClicked(true);
    navigate(`/playlist-detail/${playlistName}`);
  };
  return (
    <div className={`bg-[#181818] w-full text-white flex flex-col gap-1 cursor-pointer hover:bg-gray-800 rounded-lg pb-4 pt-2 px-[10px] items-center 2xl:items-start text-center md:text-start ${isClicked ? 'active' : ''}`} onClick={handleClick}>
      <div className='w-40 h-40 '>
        <img src={urlImg ? urlImg : "https://apksos.com/storage/images/com/samsung/galaxy/s20/music/player/com.samsung.galaxy.s20.music.player_1.png"} alt="SongImage" className=' rounded w-40 h-40 object-cover' />
      </div>
        <p className='font-semibold text-base mt-2 truncate w-full'>{playlistName}</p>
        <p className='text-xs text-gray-400 truncate w-full'>{author}</p>
  </div>
  )
}

export default Playlist
