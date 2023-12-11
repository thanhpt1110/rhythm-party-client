import React, { useState , useEffect } from 'react';
import Header from '../components/Header';
import Comments from '../components/Comments';
import { useParams } from 'react-router';
import api from '../utils/Api';

const commentsData = [
    {
        username: 'Perter Parker',
        comment: 'Cool',
        avatar: 'https://www.usatoday.com/gcdn/-mm-/cc053686530ce446f0a27dc352961fac33dd12ac/c=1144-81-2630-920/local/-/media/2017/06/26/USATODAY/USATODAY/636340759929048028-XXX-SPIDER-MAN-HOMECOMING-87249008.JPG',
    },
    {
        username: 'David Beckham',
        comment: 'I have replied in 2 hours ',
        avatar: 'https://icdn.dantri.com.vn/thumb_w/640/2018/6/1/david5-15278233009671407992892.jpg',
    },
    {
        username: 'Diana',
        comment: "It's a nice songs. I luv it !",
        avatar: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2020/06/04014638/706b54b2-1a6a-11ec-954e-0ecc81f4ee58-972x597.jpg',
    },
    // Add more comment objects as needed
];

const SongDetail = () => {
    const  {id} = useParams();
    const [song, setSong] = useState(null);

    useEffect(() =>{
         api.get(`/api/music/${id}`).then(async (response) =>{
            await setSong (response.data.data);
         });
    },[])


    const handleBackClick = () => {
        window.history.back();
    };
    const [showAllLyric, setShowAllLyric] = useState(false);
    const toggleLyrics  = () => {
        setShowAllLyric(!showAllLyric);
    };
    const halfLength = Math.ceil(song && song.lyrics.length / 2);
    const displayedLyrics = (showAllLyric ? song && song.lyrics: song && song.lyrics.substring(0, halfLength) + '...');

    const [isTextareaFocused, setTextareaFocused] = useState(false);
    const handleTextareaFocus = (event) => {
        const textareaValue = event.target.value.trim();
        setTextareaFocused(textareaValue !== '');
    };

    return (
        <div>
            <Header />
            <div className='py-16 bg-black opacity-90 text-white w-full h-full'>
                <div className='relative bg-[#9890A0] '>
                    <div className=' h-[18rem] bg-cover bg-center bg-gradient-to-b from-transparent to-[#181818]'></div>
                    <div className='absolute top-1/2 ml-24 transform -translate-y-1/2 items-center flex flex-row '>
                        <div className='relative flex flex-row gap-6 '>
                            <div className='mr-6 px-2 py-2 rounded-full'>
                                <i
                                    className='ri-arrow-left-s-line cursor-pointer text-2xl rounded-full bg-slate-800 hover:bg-slate-700 px-2 py-2 '
                                    onClick={handleBackClick}
                                ></i>
                            </div>
                            <img
                                src={song && song.imgUrl}
                                alt='AlbumImg'
                                className='" h-48 w-48 rounded shadow-2xl shadow-black object-cover'
                            />
                            <div className='flex flex-col justify-center gap-4'>
                                <p className='font-bold text-[40px]'>
                                    {song ? song.musicName : ''}
                                </p>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-base font-semibold'>
                                        {song ? song.author : ''}
                                    </p>
                                    { song &&
                                    song.genre.map((genre,index) =>(<p key={index} className='text-sm text-gray-300'> {genre} </p>))
                                    }
                                    <p className='text-xs text-gray-300'>
                                        Release in {song && song.releaseYear} - {song && song.view} View
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-screen-xl mx-auto py-8'>
                    <p className='font-bold py-8 text-xl mt-10 border-b border-gray-500'>
                        Lyrics of the Song:
                    </p>
                   <div className='text-slate-300 text-sm py-8 leading-7'>
                     <p className="whitespace-pre-line">
                        {displayedLyrics}
                      </p>
                      {song && song.lyrics.length > halfLength && (
                        <button
                          className="text-indigo-600 hover:underline mt-4"
                          onClick={() => setShowAllLyric(!showAllLyric)}
                        >
                          {showAllLyric ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                  </div>
                    <p className='font-bold pb-8 text-xl '>
                        Comments ( {commentsData.length} )
                    </p>
                    <div>
                        {commentsData.map((comment, index) => (
                            <Comments
                                key={index}
                                username={comment.username}
                                comment={comment.comment}
                                avatar={comment.avatar}
                            />
                        ))}
                        <div className='flex flex-col bg-[#222222] rounded justify-between px-4 py-4  '>
                            <textarea
                                id='yourcomment'
                                name='yourcomment'
                                className=' focus:border-none active:border-none resize-none rounded-t-xl w-full text-sm px-4 py-2 bg-[#444444] outline-none overflow-hidden'
                                cols='6'
                                rows='2'
                                placeholder='Comment here'
                                onChange={handleTextareaFocus}
                            ></textarea>

                            <div className='flex gap-4 bg-[#444444] py-2 px-4 rounded-b-xl justify-between'>
                                <div className='flex flex-row gap-3'>
                                    <i className='ri-emotion-line cursor-pointer text-xl '></i>
                                    <i className='ri-camera-fill cursor-pointer text-xl '></i>
                                    <i className='ri-file-gif-line cursor-pointer text-xl'></i>
                                </div>
                                <i
                                    className={`ri-send-plane-2-fill text-xl cursor-pointer ${
                                        isTextareaFocused
                                            ? ' text-indigo-600 pointer-events-auto'
                                            : ' pointer-events-none'
                                    }`}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetail;
