import React from 'react';
import {Link} from 'react-router-dom';
import logoRoom from '../../src/assets/images/logoRoom.png';
import PublicRoom from '../components/PublicRoom';
import {useState} from 'react';
import UserAvatar from '../components/UserAvatar';
import LOGO from '../../src/assets/images/LOGO.png'

const Room = ({user}) => {
//lay user data tu trong context
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true); // Hiển thị modal khi người dùng nhấp vào nút mở modal
  };
  const handleCloseModal = () => {
    setShowModal(false); // Ẩn modal khi người dùng nhấp vào nút đóng modal
  };

  return (
    <div>
      <header>
        <nav className='bg-[#101010] text-white fixed w-full z-20 top-0 left-0 shadow'>
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
              <UserAvatar user={user}/>
               <div className="relative inline-block">
          </div>
            </div>
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
              <div className='flex flex-col p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  md:text-xl text-white '>
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
        <div className='text-3xl font-bold text-center pb-4'>
          Welcome back, UserName !
        </div>
        <p>It's great to see you again.</p>
        <p className='text-xs'>
          Have a room code? Join a room with it:
        </p>
        <div className='flex'>
          <input type='text' placeholder='XXXXXX' className=' rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 bg-[#181818] '/>
          <button className='bg-gradient-to-r from-indigo-600 to-purple-700  text-white font-medium rounded-r-md px-4 py-2'>
            Join
          </button>
        </div>
      </main>
      <div className=' max-w-screen-xl mx-auto p-4'>
        <p className='text-3xl font-bold pb-8'>
          Public Rooms
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6'>
          <PublicRoom roomName="David's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
          <PublicRoom roomName="Hanna's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
          <PublicRoom roomName="Lucy's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
          <PublicRoom roomName="Vuong Pham's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
        </div>
      </div>
      {
      showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='fixed inset-0 bg-gray-900 opacity-50'></div>
          <div className='modal-container bg-white w-96 rounded-lg p-6 z-50 text-black'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold '>Create a Room</h2>
              <button className='text-gray-600 hover:text-gray-800 text-2xl rounded-md px-2 hover:bg-slate-200'
                onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <p className='font-semibold'>Room name:</p>
            <input className="border border-gray-300 shadow-sm rounded-lg py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-4 w-full" type="text" placeholder="Your Room"/>
            <div className='flex justify-between mt-16'>
              <button onClick={handleCloseModal}
                className=' hover:bg-slate-200 border border-gray-300 shadow-sm rounded-lg py-2 px-6'>Cancel</button>
              <button className='border border-gray-300 shadow-sm rounded-lg py-2 px-6 bg-blue-700 hover:bg-blue-800 text-white'>Create</button>
            </div>
          </div>
        </div>
      )
    } </div>
      </div>

  );
};

export default Room;
