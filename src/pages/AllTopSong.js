import React,{useEffect} from 'react'
import Header from '../components/Header';
import Player from '../components/Player';
import { useMusicContext } from '../utils/MusicContext';
import SongCard from '../components/SongCard';

 const TopsongsData = [
    {
      imgUrl: 'https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/2/f/a/7/2fa7217d7ba558e5f9ab43b267e7de5e.jpg',
      musicName: 'Từng Quen',
      author: 'Wren Evans'
    },
    {
      imgUrl: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/c/4/b/0/c4b0da67bae11731685f79432dc462b7.jpg',
      musicName: 'Một Đêm Say',
      author: 'Thịnh Suy'
    },
    {
      imgUrl: 'https://i.ytimg.com/vi/tRFLs_-54gE/maxresdefault.jpg',
      musicName: 'Love Story',
      author: 'Taylor Swift'
    },
    {
      imgUrl: 'https://i1.sndcdn.com/artworks-0aDqhBAzd6pkEtIU-eJ1E1Q-t500x500.jpg',
      musicName: 'Tự Sự',
      author: 'Obito ft MCK'
    },
    {
      imgUrl: 'https://avatar-ex-swe.nixcdn.com/song/2023/04/19/d/2/5/3/1681879735020_640.jpg',
      musicName: 'Không Thể Say',
      author: 'HieuThuHai'
    },
    {
      imgUrl: 'https://cafebiz.cafebizcdn.vn/2019/12/23/all-i-want-for-christmas-is-you-15770727420652046746371.jpg',
      musicName: 'All I Want for Christmas Is You',
      author: 'Mariah Carey'
    },
    {
      imgUrl: 'https://vtv1.mediacdn.vn/zoom/640_400/2020/12/19/nkk2664-1608348105952437410015.jpg',
      musicName: 'Đi Về Nhà',
      author: 'Đen ft Justatee'
    },
     {
      imgUrl: 'https://i.ytimg.com/vi/XWhdbZ9-uGA/maxresdefault.jpg',
      musicName: 'Đi Để Trở Về 2',
      author: 'Soobin Hoàng Sơn'
    },
    {
      imgUrl: 'https://avatar-ex-swe.nixcdn.com/song/2023/02/08/f/b/7/8/1675826886037_640.jpg',
      musicName: 'Stream Đến Bao Giờ',
      author: 'Độ Mixi'
    },
     {
      imgUrl: 'https://i.ytimg.com/vi/Jk38OqdAQxc/maxresdefault.jpg',
      musicName: 'Độ Tộc 2',
      author: 'Độ Mixi x Pháo x Phúc Du'
    },
  ];

const AllTopSong = () => {
   const handleBackClick = () => {
    window.history.back();
  };
  const {music, setIsActive} = useMusicContext();
  useEffect(()=>{
    if(music!==null && music !==undefined)
      setIsActive(true)
    else
      setIsActive(false)
  },[music])
  return (
    <div>
            <Header />
            <div className='py-16 bg-black opacity-90 text-white'>
                <div className='max-w-screen-xl mx-auto py-20 h-full'>
                      <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-8'>All Top Songs</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {TopsongsData.map((topsong, index) => (
                            <SongCard
                                key={index}
                                song = {topsong}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AllTopSong
