import React from "react";
const SongCard = ({SongImg , SongName, SongArtist}) => {
  return (
    <div>
         <div className="bg-[#181818] w-full text-white flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-800 rounded-lg pb-4 pt-2 px-[10px] 2xl:items-start text-center md:text-start">
          <div className="w-40 h-40">
            <img src={SongImg} alt="SongImage" className="rounded object-cover h-40 w-40" />
          </div>
          <p className="font-semibold text-base mt-2 truncate w-full">{SongName}</p>
          <p className="text-xs text-gray-400 truncate w-full">{SongArtist}</p>
        </div>
    </div>
  )
}

export default SongCard
