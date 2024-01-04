import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logoRoom from '../../src/assets/images/logoRoom.png';
import PublicRoom from '../components/PublicRoom';
import {useState,useEffect} from 'react';
import UserAvatar from '../components/UserAvatar';
import LOGO from '../../src/assets/images/LOGO.png'
import { useMusicContext } from '../utils/MusicContext';
import { getCurrentRoomMusic, postNewRoom , getRoomById} from '../api/RoomApi';
import { ToastContainer, toast } from 'react-toastify';

const Room = () => {
//lay user data tu trong context
  const [showModal, setShowModal] = useState(false);
  const [listOwnRoom, setListOwnRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [roomJoinId, setRoomJoinId] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const loadYourRoom = async ()=>{
      const respone = await getCurrentRoomMusic();
      if(respone.status===200)
      {
        setListOwnRoom(respone.data.data);
      }
      setIsLoading(false)
    }
    if(isLoading)
      loadYourRoom()
  },[isLoading])
  const handleOpenModal = () => {
    setShowModal(true); // Hiển thị modal khi người dùng nhấp vào nút mở modal
  };
  const handleCloseModal = () => {
    setShowModal(false); // Ẩn modal khi người dùng nhấp vào nút đóng modal
  };
  const {music, setIsActive} = useMusicContext();
    useEffect(()=>{
      if(music!==null && music !==undefined)
        setIsActive(true)
      else
        setIsActive(false)
    },[music])
  const handleCreateRoom = async (e)=>{
    if(roomName==='')
    {
      alert("Enter your room name")
      return;
    }
    try{
      const room = {roomName: roomName}
      const respone  = await postNewRoom(room);
      if(respone.status === 200)
      {
        
        toast.success('Create room success')
      }
      else
        toast.error("Create room failed");
    }
    catch(e)
    {
      console.log(e)
    }
    finally{
      toast.error("Create room failed");
      setRoomName('');
      setIsLoading(true);
      handleCloseModal();
    }
  }
  const handleRoomNameOnChange = (e) =>{
    setRoomName(e.target.value)
  }
  const handleJoinRoom = async()=>{
    if(roomJoinId==='')
    {
      toast.warn('Add your room ID')
      return;
    }
    else{
      try{
        console.log(roomJoinId);
        const respone = await getRoomById(roomJoinId);
        console.log(respone)
        if(respone.status === 200)
        {
          const room = respone.data.data;
          toast.success(`Your join to room ${room.roomName}`)
          navigate(`/room-detail/${room._id}`);
        }
        else if(respone.status === 404)
        {
          toast.error('Your room ID is not existed');
          return;
        }
        else{
          toast.error('Join room failed!')
        }
      }
      catch(e)
      {
        console.log(e)
        toast.error('Join room failed!')
      }
    }
  }
  const handleRoomIdOnchange = (e)=>{
    setRoomJoinId(e.target.value)
  }
  return (
  isLoading ? (
    <div className='text-center w-screen h-screen py-60'>
        <span className="loader h-20 w-20 "></span>
    </div> ):
    (
    <div>
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
      <header>
        <nav className='bg-[#101010] text-white w-full z-20 top-0 left-0 shadow fixed'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <div className='flex items-center'>
              <img src={LOGO} className='h-8 mr-3' alt='WebsiteLogo'/>
              <span className='self-center text-2xl font-semibold whitespace-nowrap '>
                <Link to='/'>
                  Rhythm Party
                </Link>
              </span>
            </div>
            <div className='flex md:order-2'>
              <button onClick={handleOpenModal}
                className='text-white bg-gradient-to-r from-indigo-600 to-purple-700 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 cursor-pointer'>
                <i className='ri-add-line mr-2'></i>
                <span>
                  Create a Room
                </span>
              </button>
              <UserAvatar/>
               <div className="relative inline-block">
          </div>
            </div>
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
            <div className='absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  md:text-xl text-white '>
              Join a room to start listening to music!
            </div>
            </div>
          </div>
        </nav>
      </header>
      <div className='bg-black opacity-90 text-white'>
        <main className=' max-w-screen-xl flex flex-col flex-wrap mx-auto p-4 items-center justify-center gap-4'>
        <div className=''>
          <img src={logoRoom}
            alt='listenImg'
            className=' h-96 w-96'/>
        </div>
        <div className='text-2xl font-bold text-center '>
          It's great to see you again.
        </div>
        <p className='text-xs font-semibold text-gray-400'>
          Have a room code? Join a room with it:
        </p>
        <div className='flex'>
          <input type='text' placeholder='XXXXXX'
          value={roomJoinId}
          onChange={handleRoomIdOnchange}
          className=' rounded-l-lg text-sm font-bold w-64 px-8 py-4 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-[#181818] '/>
          <button className='bg-gradient-to-r from-indigo-600 to-purple-700  text-white font-medium rounded-r-lg px-6 py-2'
          onClick={handleJoinRoom}>
            Join
          </button>
        </div>
      </main>
      <div className=' max-w-screen-xl mx-auto p-4'>
        <p className='text-3xl font-bold pb-8'>
          Your Rooms
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
          {
            listOwnRoom.map((room,index) => (
              <PublicRoom
              room = {room}
              key={index}/>
            ))
          }

        </div>
      </div>
      {
      showModal && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='fixed inset-0 bg-gray-900 opacity-50'></div>
            <div className='modal-container bg-[#1f2937] text-white w-96 rounded-lg p-6 z-50'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold '>Create a Room</h2>
                <button className='text-white  text-2xl rounded-full px-2 hover:bg-slate-600'
                  onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <p className='font-semibold mt-8'>Room name:</p>
              <input value={roomName} onChange={handleRoomNameOnChange} className="border border-gray-300 shadow-sm rounded-lg py-2 px-4 bg-[#1f2937] mt-4 w-full " type="text" placeholder="Your Room" required/>
              <button onClick={handleCreateRoom} className='  shadow-sm rounded-lg py-2 px-6 bg-gradient-to-r from-indigo-600 to-purple-700   w-full mt-16'>Create</button>
            </div>
          </div>
      )
    } </div>
      </div>
  ));
};

export default Room;
