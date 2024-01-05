import React, { useState , useEffect,useRef } from 'react';
import Header from '../components/Header';
import Comments from '../components/Comments';
import { useParams } from 'react-router';
import api from '../api/Api';
import { useAuth } from '../utils/AuthContext';
import { sendMessage ,getMusicByID } from '../api/MusicApi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import ErrorNotFound from '../components/ErrorNotFound';
import { deleteMusicByID } from '../api/MusicApi';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/Firebase';
import {  ref, deleteObject } from 'firebase/storage';
import { useMusicContext } from '../utils/MusicContext';
import { ToastContainer, toast } from 'react-toastify';
const SongDetail = () => {
    const {authUser,socket} = useAuth();
    const {music,setMusic, setListOfSong, isPlaying, setIsPlaying} = useMusicContext()
    const  {id} = useParams();
    const [song, setSong] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [listComment, setListComment] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [isGuest,setIsGuest] = useState(false);
    const [isNotFound,setIsNotFound] = useState(false);
    const [yourSongIsPlaying, setYourSongIsPlaying] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        if(isPlaying && music._id === song._id)
            setYourSongIsPlaying(true);
    },[isPlaying,music]);
    useEffect(() =>{
        const getMusic = async() =>{
            try{
            const respone = await getMusicByID(id);
            if(respone.status === 404)
            {
                setIsNotFound(true);
                setIsLoading(false);
                return;
            }
            if(respone.status !== 200 )
            {
                setIsError(true);
                setIsLoading(false);
                return;
            }
            const music = respone.data.data;
            console.log(music)
            if(!(music.musicPrivacyType === "Public" ))
            {
                if(!authUser || authUser._id !== music.musicPostOwnerID)
                {
                    setIsNotFound(true);
                    setIsLoading(false);
                    return;
                }
            }
            setSong(respone.data.data)
            setListComment(respone.data.data.messages);
            setIsLoading(false);
            if(!authUser)
            {
                setIsGuest(true);
                return;
            }
            if(authUser._id!==respone.data.data.musicPostOwnerID)
            {
                setIsGuest(true);
            }
            }
            catch(err){
                console.log(err)
                setIsError(true);
            }
        }
        if(!song)
        {
            getMusic();
        }

    },[])
    useEffect(() => {
        if (socket) {
            socket.emit('join_music', id);
        }
        return () => {
            if (socket) {
                socket.emit('leave_music', id);
            }
        };
    }, [socket, id]);
    useEffect(() => {
        const handleReceiveMessage = (comment) => {
            console.log(comment.data.data);
            setListComment((list) => [comment.data.data, ...list]);
        };

        if (socket) {
            socket.on('receive_message_music', handleReceiveMessage);
        }

        return () => {
            if (socket) {
                socket.off('receive_message_music', handleReceiveMessage);
            }
        };
    }, [socket, setListComment]);
    const handleSendClick = async ()=>{
        if(authUser){
            const message = {message: commentText}
            const comment = await sendMessage(message,id);
            comment.musicId = id;
            console.log(comment);
            await socket.emit('send_message_music',comment);
            setListComment((list) => [comment.data.data, ...list]);
            setCommentText('')
        }
        else{
            window.location.href = '/signin';
        }

    }
    const handlePlayButton = ()=>{
        if(song._id !== music._id)
        {
            setListOfSong([song])
            setMusic(song)
        }
        else{
            setIsPlaying(true);
            setYourSongIsPlaying(true);
        }
    }
    const handlePauseButton = ()=>{
        if(yourSongIsPlaying)
            setIsPlaying(false);
        setYourSongIsPlaying(false);
    }
    const handleBackClick = () => {
        window.history.back();
    };
    const handleDeleteUploadSong = async () => {
        try{
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this song !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    const respone = await deleteMusicByID(song._id);
                    if(respone.status === 200)
                    {
                        console.log(song);
                        if(music && music._id === song._id)
                        {
                            setMusic(null);
                        }
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your song has been deleted.",
                        icon: "success"
                        });
                        navigate('/profile')
                    }
                    else{
                        toast.error("Delete song failed");
                    }
                }
                catch(ex)
                {
                    console.log(ex)
                }
            }
            });
        }
        catch(e)
        {
            console.log(e)
        }
    };
    const [showAllLyric, setShowAllLyric] = useState(false);
    const toggleLyrics  = () => {
        setShowAllLyric(!showAllLyric);
    };
    const halfLength = Math.ceil(song && song.lyrics.length / 2);
    const displayedLyrics = (showAllLyric ? song && song.lyrics: song && song.lyrics.substring(0, halfLength) + '...');

    const [isTextareaFocused, setTextareaFocused] = useState(false);
    const handleTextareaFocus = async(event) => {
        const textareaValue = event.target.value.trim();
        setTextareaFocused(textareaValue !== '');
        setCommentText(event.target.value)

    };

    return (
        isLoading ? (
        <div className='text-center w-screen h-screen py-60'>
            <span className="loader h-20 w-20 "></span>
        </div>
        ):
        isError ? (<Error/>) : isNotFound ? (<ErrorNotFound/>) : ( <div>
            <Header />
            <ToastContainer position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              className=''
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark" />
            <div className='py-16 bg-black opacity-90 text-white w-full h-full'>
                <div className='relative bg-[#9890A0] '>
                    <div className='h-[18rem] bg-cover bg-center bg-gradient-to-b from-transparent to-[#181818]'></div>
                    <div className='absolute w-[70%] top-1/2 ml-0 left-1/2 -translate-x-1/2 transform -translate-y-1/2 items-center flex flex-row '>
                        <div className='relative flex flex-row gap-6'>
                            <div className='mr-4 px-2 py-2 rounded-full'>
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
                            <div className='flex flex-col gap-4'>
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
                                    <div className='flex flex-row justify-between gap-96 items-center '>
                                        <p className='text-xs text-gray-300'>
                                        Release in {song && song.releaseYear} - {song && song.view} View
                                        </p>
                                         <div className='btnEditDelete flex flex-row gap-2 items-center'>
                                           {
                                            song.musicAuthorize === "Authorize" && <i className="ri-checkbox-circle-fill text-2xl mr-4 text-green-600"></i>
                                           } 
                                            {!isGuest && <Link to={`/song-detail/edit/${song && song._id}`} className='flex flex-row gap-2 items-center border px-3 py-[3px] border-gray-400 rounded hover:border-gray-300 ' >
                                                <i className="ri-pencil-fill"></i>
                                                <p className='text-xs font-semibold '>Edit</p>
                                            </Link>}
                                            {!isGuest &&
                                            <button className='flex flex-row gap-2 items-center border px-2 py-[3px] border-gray-400 rounded hover:border-gray-300 '  onClick={handleDeleteUploadSong}>
                                                <i className="ri-delete-bin-6-line"></i>
                                                <p className='text-xs font-semibold '>Delete</p>
                                            </button>
                                            }
                                        </div>
                                    </div>
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
                        Comments ( {listComment && listComment.length} )
                    </p>
                    <div>
                        {listComment && listComment.map((comment, index) => (
                            <Comments
                                key={index}
                                username={comment.userId.displayName}
                                comment={comment.message}
                                avatar={comment.userId.avatar? comment.userId.avatar: "https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg"}
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
                                value={commentText}
                            ></textarea>

                            <div className='flex gap-4 bg-[#444444] py-2 px-4 rounded-b-xl justify-between'>
                                <div className='flex flex-row gap-3'>
                                    <i className='ri-emotion-line cursor-pointer text-xl '></i>
                                    <i className='ri-camera-fill cursor-pointer text-xl '></i>
                                    <i className='ri-file-gif-line cursor-pointer text-xl'></i>
                                </div>
                                <i onClick={handleSendClick}
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
        </div>)

    );
};

export default SongDetail;
