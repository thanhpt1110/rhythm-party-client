import React, { useState } from 'react';
import Header from '../components/Header';
import Comments from '../components/Comments';

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

const lyricsData = [
  "Và liệu em có nghe\nTình yêu đang vụn vỡ\nVà mất bao lâu\nĐể quên đi tổn thương\nDù là nhiều năm đã qua\nTrái tim chẳng thay đổi\nVà chỉ mong được bình yên sau này\nYeah và từ lần đó\nAnh chẳng còn nhớ nhung đầy vơi\nChẳng thân quen chẳng còn đau\nNhư đã từng yeah\nLife is better if you want to\n\nNếu em nhìn thật sâu\nVào trong đôi mắt\nEm có thể thấy rằng anh đang khóc\nAnh cũng nhiều lần gây tội\nVà cũng tiếc nuối vì chuyện công cốc\nAnh chạy theo tiếng đường phố\nLặp sai và sai cứ thế lao dốc\nAnh từng nghĩ rằng anh khôn\nCho đến khi đời bảo rằng anh ngốc\nAnh vẽ ra nhiều viễn cảnh\nNhưng anh không làm dù nó khiến anh mê\nAnh ao ước khi cần chạy\nThì việc anh *** chân vẫn là thực tế\nAnh nghĩ rằng nếu hung dữ\nThì những người khác sẽ thấy anh ghê\nNhưng đến khi được yêu thương\nAnh lại thích thú như một thằng hề\nAnh từng thích dùng bạo lực\nVì không thích thằng nào không tôn trọng anh\nĐến khi anh hiểu được ra\nAi không thích mình thì chỉ việc tránh\nAnh từng nói dối rất nhiều\nDù mấy chuyện đó không vì lợi danh\nĐến khi anh hiểu được ra\nHậu quả để lại không phải điều lành\nYeah anh không cao siêu như em nghĩ\nAnh từng là em là mày\nTừng là thằng ngu làm liều khi bí\nQuan trọng là khi nhận ra\nHành động tiếp theo của em là gì\nVì đồng tiền vốn đang có hôm nay\nKhông thể nào mai trở thành tiền tỉ\nAnh chỉ đơn giản là người làm nhạc\nLà thằng chạy theo đam mê\nVì biết cố gắng là một lối thoát\nĐã từng đâm đầu việc sai\nĐể biết rút ra mới là việc đúng\nNếu muốn yên bình trong ngày mai\nThì nay phải sống như ngày cuối cùng\nTìm một nơi để yên giấc\nSau tháng năm mệt nhoài\nVà để tâm hồn\nĐược hòa vào lời hát\nCó thể em ao ước giống như anh\nKhông muốn màu sắc cuộc đời\nChỉ pha vỏn vẹn giữa đen và trắng\nKhông muốn nhìn vào trong gương\nVì không thích thứ mình trở thành\nNhưng tất cả những cơn giông đó\nGiúp em trân trọng hơn khi bầu trời xanh\nAnh cảm ơn nếu mắt em sáng\nCảm ơn từng stream bài nhạc"
]

const SongDetail = () => {
    const handleBackClick = () => {
        window.history.back();
    };
    const [showAllLyric, setShowAllLyric] = useState(false);
    const toggleLyrics  = () => {
        setShowAllLyric(!showAllLyric);
    };
    const halfLength = Math.ceil(lyricsData[0].length / 2);
    const displayedLyrics = showAllLyric ? lyricsData[0] : lyricsData[0].substring(0, halfLength);

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
                                src='https://i.ytimg.com/vi/vGnl7PCB9es/maxresdefault.jpg'
                                alt='AlbumImg'
                                className='"h-48 w-44 rounded shadow-2xl shadow-black object-cover'
                            />
                            <div className='flex flex-col gap-8 justify-center'>
                                <p className='font-bold text-[40px]'>
                                    CUPID Fifty Fifty
                                </p>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-base font-semibold'>
                                        New Jeans
                                    </p>
                                    <p className='text-sm text-gray-300'>
                                        K-Pop
                                    </p>
                                    <p className='text-xs text-gray-300'>
                                        Release in 2023 - 1.1M View
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
                      {lyricsData[0].length > halfLength && (
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
