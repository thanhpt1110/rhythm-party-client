import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
 const data = [
    {
      title: "Song 1",
      artist: "Artist 1",
      imageUrl: "https://i1.sndcdn.com/artworks-zNPCYZm8KYjtySWa-00sV4Q-t500x500.jpg",
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      imageUrl: "https://golives3.s3.amazonaws.com/2022/10/9992_48eecab60199bf96110936de4e1e27c5.jpg",
    },
    {
      title: "Song 3",
      artist: "Artist 1",
      imageUrl: "https://danviet.mediacdn.vn/296231569849192448/2023/10/14/son-tung-mtp-1697273184168953378334.jpg",
    },
    {
      title: "Song 4",
      artist: "Artist 2",
      imageUrl: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2023/06/01/d/d/9/7/1685605473158_600.jpg",
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
const ArtistCard = () => {
    const topPlays = data?.slice(0, 5);
    return (

      <div className='w-full flex flex-col mt-8 '>
          <div className='flex flex-row justify-between items-center '>
            <div className='flex gap-1'>
               <h2 className='text-2xl py-4'>Top Artists:</h2>
            </div>
            <span className='text-indigo-500 cursor-pointer text-xs font-semibold'>View All</span>
          </div>
          <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          // modules={[FreeMode]}
          className="mt-4 "
        >
          {topPlays?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist.title}
              style={{ width: '24%', height: 'auto' }}
              className=" rounded-full animate-slideright"
            >
              <div className='flex flex-col items-center gap-2'>
                <img src={artist.imageUrl} alt="Name" className="rounded-full object-cover h-40 w-40" />
                <p className='text-xs font-bold'>Artist's Name</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
    );
};

export default ArtistCard;
