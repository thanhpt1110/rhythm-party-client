import React ,{ useState } from "react";
import { useMusicContext } from "../utils/MusicContext";
import api from "../api/Api";
import { Link } from 'react-router-dom';
const SongCard = ({song, listOfSong}) => {
  const {setMusic,setListOfSong} = useMusicContext()
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleOnclick = async(e) =>{
    await setListOfSong(listOfSong)
    await setMusic(song)
  }
  return (
    <div >
         <div  className="bg-[#181818] w-full text-white flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-800 rounded-lg pb-4 pt-2 px-[10px] 2xl:items-start text-center md:text-start "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
          <div className="w-40 h-40 relative" onClick={handleOnclick}>
            <img src={song.imgUrl} alt="SongImage" className="rounded object-cover h-40 w-40" />
            {isHovered && (
                <i className="ri-play-circle-fill absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl  opacity-100 transition-opacity duration-300"></i>
              )}
          </div>
          <Link to={`/song-detail/${song._id}`} className="font-semibold text-base mt-2 truncate w-full hover:underline">{song.musicName}</Link>
          <p className="text-xs text-gray-400 truncate w-full">{song.author}</p>

        </div>
    </div>
  )
}

export default SongCard
