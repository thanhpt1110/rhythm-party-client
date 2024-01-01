import React, { useEffect } from 'react';
import SonginQueue from '../components/SonginQueue';
import MessageForm from '../components/ChatApp/MessageForm';
import ChatBox from '../components/ChatApp/ChatBox';
import { useMusicContext } from '../utils/MusicContext';
import { useParams } from 'react-router';
import { useState } from 'react';
import { getRoomById , addNewMusic, removeMusicFromRoom, uploadMessage} from '../api/RoomApi';
import Error from '../components/Error';
import ErrorNotFound from '../components/ErrorNotFound';
import { getTop6Music, search6MusicByName } from '../api/MusicApi';
import SongWithSearch from '../components/SongWithSearch';
import { ToastContainer,toast } from 'react-toastify';
import { useAuth } from '../utils/AuthContext';
import PlayerRoom from '../components/PlayerRoom';
import { useRoomContext } from '../utils/RoomContext';

const RoomDetails = () => {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [room, setRoom] = useState(null)
  const [searchMusicInput, setSearchMusicInput] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [listRecommendMusic, setListRecommendMusic] = useState([])
  const [listMusicInQueue, setListMusicInQueue] = useState();
  const {authUser,socket} = useAuth();
  const [listMessage, setListMessage] = useState([])
  const [isActivePlaying, setIsActivePlaying] = useState(false);
  const [isActivePlayer,setIsActivePlayer] =useState(false);
  const { musicCurrent,cleanRoom, setListOfSong} = useRoomContext();
  const [peopleInRoom, setPeopleInRoom] = useState(0);
  useEffect(()=>{
    if(musicCurrent)
    {
      setIsActivePlayer(true)
    }
    else
      setIsActivePlayer(false)
  },[musicCurrent])
  useEffect(()=>{
    const getRoomDetail = async()=>{
      try{
        console.log(id)
        const respone = await getRoomById(id);
        if(respone.status === 200)
        {
          setRoom(respone.data.data);
          console.log(respone.data.data)
          setListMessage(respone.data.data.messages)
          setListMusicInQueue(respone.data.data.musicInQueue)
        }
        else if(respone.status ===404)
        {
          setIsNotFound(true);
        }
        else{
          setIsError(true)
        }
      }
      catch(e)
      {
        console.log(e);
        setIsError(true)
      }
      finally{
        setIsLoading(false)
      }
    }
    if(isLoading)
      getRoomDetail();
    return (()=>{
      cleanRoom()
    })
  },[])
  useEffect(()=>{
    setIsActivePlaying(isActivePlayer)
  },[isActivePlayer])
  const handleBackClick = () => {
    window.history.back();
  };
  const { setIsActive } = useMusicContext();
  useEffect(() => {
    setIsActive(false);
  }, []);
  useEffect(() => {
    if (socket) {
        socket.emit('join_room', id);
    }
    return () => {
        if (socket) {
            socket.emit('leave_room', id);
        }
    };
}, [socket, id]);
  useEffect(()=>{
  const handleUpdatePeople = (numberOfPeople) =>{
    console.log("hello")
    setPeopleInRoom(numberOfPeople)
  }
    if (socket) {
      socket.on('update-people-in-room',handleUpdatePeople);
  }
  return () => {
      if (socket) {
          socket.off('update-people-in-room', handleUpdatePeople);
      }
  };
  }
  ,[setPeopleInRoom,socket])
const callBackAddMessage = (message)=>{
  setListMessage((list) => [...list,message.data.data]);
}

useEffect(() => {
  const handleReceiveMessage = (message) => {
      setListMessage((list) => [...list,message.data.data]);
  };
  if (socket) {
      socket.on('receive_message_room', handleReceiveMessage);
  return () => {
      if (socket) {
          socket.off('receive_message_room', handleReceiveMessage);
      }
  };
}}, [socket, setListMessage]);
useEffect(() => {
  const handleReceivePlaylist = (music) => {
      setListMusicInQueue(music.musicInQueue);
      setListOfSong(music.musicInQueue);
  };
  if (socket) {
      socket.on('receive_playlist_change_room', handleReceivePlaylist);
  return () => {
      if (socket) {
          socket.off('receive_playlist_change_room', handleReceivePlaylist);
      }
  };
}}, [socket, setListMusicInQueue]);

  const handleSearchMusicPlaylist = async()=>{
    try{
      const respone = await getTop6Music();
      if(respone.status===200)
        setListRecommendMusic(respone.data.data);
    }
    catch(e)
    {
      console.log(e)
    }
    finally{
      document.getElementById('my_modal_2').showModal()
    }
  }
  const handleOnAddSong = async(music)=>{
    try{
      const respone = await addNewMusic(music._id, room._id);
      if(respone.status===200)
      {
        toast.success("Add music to playlist");
        setListMusicInQueue(respone.data.data.musicInQueue);
        const responeData = {roomId: room._id, musicInQueue: respone.data.data.musicInQueue}
        socket.emit("on_playlist_change_room",responeData)
      }
      else{
        toast.error("Add music to playlist failed")
      }
    }
    catch(e)
    {
      console.log(e);
      toast.error("Add music to playlist failed")
    }
  }
  const handleOnRemoveSong = async(music)=>{
    try{
      const respone = await removeMusicFromRoom(music._id, room._id);
      if(respone.status===200)
      {
        toast.success("Remove music from playlist");
        setListMusicInQueue(respone.data.data.musicInQueue);
        const responeData = {roomId: room._id, musicInQueue: respone.data.data.musicInQueue}
        socket.emit("on_playlist_change_room",responeData)
      }
      else{
        toast.error("Remove music from playlist failed")
      }
    }
    catch(e)
    {
      console.log(e);
      toast.error("Add music from playlist failed")
    }
  }
  const handledCloseButton = ()=>{
    setSearchMusicInput('');
  }
  const handleOnSearch = async (e) => {
    const value = e.target.value;
    setSearchMusicInput(value);

    // Xóa timeout trước đó (nếu có)
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    // Tạo một timeout mới và lưu trữ nó
    const timeoutId = setTimeout(async () => {
      // Gọi hàm tìm kiếm sau khi đợi 0.7s
      const response = await search6MusicByName(value);
      if(response.status===200)
      {
        setListRecommendMusic(response.data.data)
      }
      // Xử lý kết quả tìm kiếm tại đây

      // Đặt lại giá trị của timeout sau khi đã hoàn tất tìm kiếm
      setSearchTimeout(null);
    }, 500);
    // Lưu trữ timeoutId để có thể xóa nó nếu cần thiết
    setSearchTimeout(timeoutId);
  };

  return (
    isLoading ?  (
      <div className='text-center w-screen h-screen py-60'>
          <span className="loader h-20 w-20 "></span>
      </div> ) :
    isError ? <Error/> : isNotFound ? <ErrorNotFound/> :
    <div className='w-screen h-screen flex overflow-hidden max-h-screen'>
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
      <div className="w-[70%] bg-black text-white">
        <div className='flex items-center text-3xl font-bold py-8 w-full gap-96'>
           <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl text-white rounded-full bg-slate-700 px-3 py-2 hover:bg-slate-600 ml-8"
            onClick={handleBackClick}
          ></i>
          <div className='border flex flex-col gap-2 items-center border-gray-700 py-2 px-6 text-white bg-gray-800 rounded'>
            <p className='text-xl'>{room && room.roomName}'s Room</p>
            <p className='text-xs text-gray-400'>ID: {room && room._id}</p>
          </div>
        </div>
        <div className='flex flex-col gap-3 ml-28 '>
          <p className='text-xl font-bold text-gray-400 '>Chat Box</p>
          <div className='flex gap-2 items-center'>

            <p className='flex justify-center items-center w-5 h-5 rounded-full bg-green-500 text-xs font-bold '>{peopleInRoom}</p>
             <p className='text-xs font-bold'>Online</p>
          </div>

        </div>

        <div className='max-h-[50%] overflow-y-auto '>
          <ChatBox messages= {listMessage}/>
          <MessageForm idRoom={room._id} onAddMessage = {callBackAddMessage}/>
        </div>
      </div>
      <div className="w-[30%] bg-black opacity-90 text-white px-8 pb-20">
        <div className='flex flex-row justify-between items-center'>
          <p className='my-8 font-bold text-xl'>Songs in Queue</p>
           {authUser._id === room.roomOwner && <i className="ri-play-list-add-line hover:text-gray-500 cursor-pointer text-xl" onClick={handleSearchMusicPlaylist}></i>}
        </div>
        <div className='h-screen overflow-y-auto max-h-screen '>
          {listMusicInQueue.map((music, index) => (
            <SonginQueue
              key={index}
              music = {music}
              backgroundSong="#181818"
              listOfSong = {listMusicInQueue}
              onRemoveSongClick = {() => handleOnRemoveSong(music)}
            />
          ))}
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-[#1f2937] text-white pb-16 ">
          <h3 className="font-bold text-2xl my-8">Add your song to Queue!</h3>
          <input type="text" placeholder='Search for a song to queue...' className='bg-[#1f2937] border border-gray-400 w-full py-2 px-3 rounded'
           onChange={handleOnSearch} />
           <div className='mt-8 grid grid-cols-2 gap-x-4 '>
                {listRecommendMusic.slice(0, 6).map((music, index) => (
                  <SongWithSearch
                    key={index}
                    music = {music}
                    onAddSongClick = {()=>handleOnAddSong(music)}
                    backgroundSong="#2B3440"
                  />
                ))}
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handledCloseButton}>close</button>
        </form>
      </dialog>
      {isActivePlayer && <PlayerRoom/>}
    </div>
  );
};

export default RoomDetails;
