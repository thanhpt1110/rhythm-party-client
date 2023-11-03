import React, { useState } from "react";
const SongCard = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const songs = [
    {
      title: "Song 1",
      artist: "Artist 1",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    {
      title: "Song 3",
      artist: "Artist 1",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    {
      title: "Song 4",
      artist: "Artist 2",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    {
      title: "Song 5",
      artist: "Artist 1",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    {
      title: "Song 6",
      artist: "Artist 2",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    // Add more songs as needed
  ];
   const handlePrevSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextSlide = () => {
    const maxIndex = Math.floor((songs.length - 1) / 4);
    setSliderIndex((prevIndex) =>
      prevIndex < maxIndex ? prevIndex + 1 : prevIndex
    );
  };

  const renderSongs = () => {
    const startIndex = sliderIndex * 4;
    const endIndex = startIndex + 4;
    const visibleSongs = songs.slice(startIndex, endIndex);

    return visibleSongs.map((song, index) => (
      <div key={index} className="flex flex-col cursor-pointer bg-slate-300 rounded-lg mx-4 pb-3">
        <div className=" mx-2 my-2">
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-40 h-40 object-fit rounded-lg"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium ml-4">{song.title}</h3>
          <p className="ml-4 text-gray-500 text-xs">{song.artist}</p>
        </div>
      </div>
    ));
    };
  return (

    <div className="flex items-center ">
      <button
        onClick={handlePrevSlide}
        disabled={sliderIndex === 0}
        className="text-xl "
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      <div className="flex overflow-x-auto  ">

        {renderSongs()}</div>

      <button
        onClick={handleNextSlide}
        disabled={sliderIndex === Math.floor((songs.length - 1) / 4)}
        className="text-xl"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  )
}

export default SongCard
