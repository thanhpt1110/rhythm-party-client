import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Link } from 'react-router-dom';
 const data = [
    {
      title: "Song 1",
      artist: "Obito",
      imageUrl: "https://i1.sndcdn.com/artworks-zNPCYZm8KYjtySWa-00sV4Q-t500x500.jpg",
    },
    {
      title: "Song 2",
      artist: "Vũ",
      imageUrl: "https://golives3.s3.amazonaws.com/2022/10/9992_48eecab60199bf96110936de4e1e27c5.jpg",
    },
    {
      title: "Song 3",
      artist: "Sơn Tùng MTP",
      imageUrl: "https://danviet.mediacdn.vn/296231569849192448/2023/10/14/son-tung-mtp-1697273184168953378334.jpg",
    },
    {
      title: "Song 4",
      artist: "Trúc Nhân",
      imageUrl: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2023/06/01/d/d/9/7/1685605473158_600.jpg",
    },
    {
      title: "Song 5",
      artist: "Taylor Swift",
      imageUrl: "https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg",
    },
    {
      title: "Song 6",
      artist: "Amme",
      imageUrl: "https://vtv1.mediacdn.vn/thumb_w/640/2020/6/17/amee-1592376839060876149464.jpg",
    },
    {
      title: "Song 7",
      artist: "Bray",
      imageUrl: "https://vcdn1-giaitri.vnecdn.net/2023/05/11/BRAY232-1683787021-7647-1683791747.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=S7Au9I3KFnd_PwQYsr6mog",
    },
    // Add more songs as needed
  ];
const ArtistCard = () => {
    const topPlays = data?.slice(0, 8);
    return (

      <div className='w-full flex flex-col mt-10 '>
          <div className='flex flex-row justify-between items-center '>
            <div className='flex gap-1'>
               <p className='text-white font-bold text-2xl py-4'>Top Artists</p>
            </div>
            <Link to='/AllArtist' className='text-white font-semibold text-[12px] hover:underline cursor-pointer'>Show All</Link>
          </div>
          <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          freeMode
          centeredSlides
          centeredSlidesBounds
          // modules={[FreeMode]}
          className="mt-4 "
        >
          {topPlays?.slice(0, 8).map((artist) => (
            <SwiperSlide
              key={artist.title}
              style={{ width: '21%', height: 'auto' }}
              className=" rounded-full animate-slideright"
            >
              <div className='flex flex-col items-center gap-4 cursor-pointer'>
                <img src={artist.imageUrl} alt="Name"  className="rounded-full object-cover h-24 w-24 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:h-40 xl:w-40 2xl:h-44 2xl:w-44"/>
                <p className='text-[14px] font-bold'>{artist.artist}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
    );
};

export default ArtistCard;
