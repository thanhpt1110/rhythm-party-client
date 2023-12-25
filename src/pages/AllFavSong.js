import React from 'react'
import Header from '../components/Header';
import SongCard from '../components/SongCard';
import Footer from '../components/Footer';

const FavSongsData = [
  {
    imgUrl: 'https://bazaarvietnam.vn/wp-content/uploads/2023/10/HBVN-binz-xuan-dan-hit-me-up.jpg',
    musicName: 'Hit Me Up',
    author: 'Binz'
  },
  {
    imgUrl: 'https://i1.sndcdn.com/artworks-yOf4Rf5XXfb35JFR-CGdrMw-t500x500.jpg',
    musicName: 'Hold On Tight',
    author: 'Aespa'
  },
  {
    imgUrl: 'https://avatar-ex-swe.nixcdn.com/song/2022/02/09/c/e/0/1/1644402723076_640.jpg',
    musicName: 'Christmas Tree',
    author: 'V'
  },
  {
    imgUrl: 'https://i.ytimg.com/vi/ISAKquo_whg/maxresdefault.jpg',
    musicName: 'Hồi Ức',
    author: 'Phan Mạnh Quỳnh'
  },
  {
    imgUrl: 'https://images2.thanhnien.vn/528068263637045248/2023/10/9/poster-16968609330411397347070.jpg',
    musicName: 'Bài ca đất phương Nam',
    author: 'Đức Trí'
  },
  {
    imgUrl: 'https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/2/8/e/2/28e2688372cbd8efa2ba3b35a7432bd1.jpg',
    musicName: 'Champions',
    author: 'Obito'
  },
  // Thêm các playlist khác vào đây
];

const AllFavSong = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div>
      <Header />
      <div className='pt-20 pb-32 bg-black opacity-90 text-white'>
                <div className='max-w-screen-xl mx-auto py-20 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-14'>All Favorite Songs</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {
                        FavSongsData.map((topsong, index) => (
                            <SongCard
                                key={index}
                                song = {topsong}
                                listOfSong={FavSongsData}
                            />
                        ))}
                    </div>
                </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AllFavSong
