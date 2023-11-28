import React from 'react'
import Header from '../components/Header';
import ArtistFav from '../components/ArtistFav';
import Player from '../components/Player';

const artistsData = [
  {
    urlImg: 'https://ss-images.saostar.vn/w800/pc/1680851009890/saostar-2ka5fti72hsf2wck.jpeg',
    ArtistName: 'IU',
    role: 'Artist'
  },
  {
    urlImg: 'https://cdn.tuoitre.vn/thumb_w/640/471584752817336320/2023/2/13/tieu-su-ca-si-rose-blackpink-12-167628252304049682913.jpg',
    ArtistName: 'Rose',
    role: 'Artist'
  },
  {
    urlImg: 'https://www.rappler.com/tachyon/2021/12/Screen-Shot-2021-12-17-at-2.23.27-PM.png',
    ArtistName: 'Charlie Puth',
    role: 'Artist'
  },
  {
    urlImg: 'https://vcdn1-giaitri.vnecdn.net/2020/12/22/EdSheeran-1608608466-4639-1608608573.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=yXB5BHHa0ts49EPE0f-WrQ',
    ArtistName: 'Ed Sheeran',
    role: 'Artist'
  },
  {
    urlImg: 'https://tieusu.com/wp-content/uploads/2023/06/tieu-su-ca-si-Phuong-Ly-4.jpg',
    ArtistName: 'Phuong Ly',
    role: 'Artist'
  },
  {
    urlImg: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/9/11/1240204/Lyly3.jpg',
    ArtistName: 'LyLy',
    role: 'Artist'
  },
  {
    urlImg: 'https://i1.sndcdn.com/artworks-zNPCYZm8KYjtySWa-00sV4Q-t500x500.jpg',
    ArtistName: 'Obito',
    role: 'Artist'
  },
  {
    urlImg: 'https://golives3.s3.amazonaws.com/2022/10/9992_48eecab60199bf96110936de4e1e27c5.jpg',
    ArtistName: 'Vũ',
    role: 'Artist'
  },
  {
    urlImg: 'https://danviet.mediacdn.vn/296231569849192448/2023/10/14/son-tung-mtp-1697273184168953378334.jpg',
    ArtistName: 'Sơn Tùng MTP',
    role: 'Artist'
  },
  {
    urlImg: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2023/06/01/d/d/9/7/1685605473158_600.jpg',
    ArtistName: 'Trúc Nhân',
    role: 'Artist'
  },
  {
    urlImg: 'https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg',
    ArtistName: 'Taylor Swift',
    role: 'Artist'
  },
  {
    urlImg: 'https://vtv1.mediacdn.vn/thumb_w/640/2020/6/17/amee-1592376839060876149464.jpg',
    ArtistName: 'Amme',
    role: 'Artist'
  },
  {
    urlImg: 'https://vcdn1-giaitri.vnecdn.net/2023/05/11/BRAY232-1683787021-7647-1683791747.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=S7Au9I3KFnd_PwQYsr6mog',
    ArtistName: 'Bray',
    role: 'Artist'
  }
  // Thêm các nghệ sĩ khác vào đây
];

export const AllArtist = () => {
   const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div>
            <Header />
            <div className='py-16 bg-black opacity-90 text-white px-4'>
                <div className='max-w-screen-xl mx-auto py-16 h-full'>
                    <i className="ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 "
                      onClick={handleBackClick}></i>
                    <p className='text-white font-bold text-2xl my-8'>All Artists</p>
                    <div className='text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
                        {artistsData.map((artist, index) => (
                            <ArtistFav
                                key={index}
                                urlImg={artist.urlImg}
                                ArtistName={artist.ArtistName}
                                role={artist.role}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Player/>
        </div>
  )
}

