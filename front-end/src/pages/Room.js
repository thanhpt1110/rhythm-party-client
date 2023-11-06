import React from 'react';
import {Link} from 'react-router-dom';
import ListenTogether from '../../src/assets/images/ListenTogether.png';
import PublicRoom from '../components/PublicRoom';
import {useState} from 'react';
const Room = () => {
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
        <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <div className='flex items-center'>
              <img src='https://flowbite.com/docs/images/logo.svg' className='h-8 mr-3' alt='Flowbite Logo'/>
              <span className='self-center text-2xl font-semibold whitespace-nowrap '>
                <Link to='/'>
                  Rhythm Party
                </Link>
              </span>
            </div>
            <div className='flex md:order-2'>
              <button onClick={handleOpenModal}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 cursor-pointer'>
                <i className='ri-add-line mr-2'></i>
                <span>
                  Create a Room
                </span>
              </button>
              <div className='ml-10 flex items-center cursor-pointer'>
                <img className='h-10 w-10 rounded-full' src='https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg' alt='avatar'/>
                <div>
                  <i className='ri-arrow-drop-down-line text-2xl'></i>
                </div>
              </div>
            </div>
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
              <div className='flex flex-col p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:text-xl '>
                Join a room to start listening to music!
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className=' py-20 max-w-screen-xl flex flex-col flex-wrap mx-auto p-4 items-center justify-center gap-4'>
        <div className='pt-8 '>
          <img src={ListenTogether}
            alt='listenImg'
            className='h-48 w-52'/>
        </div>
        <div className='text-3xl font-bold pt-2 text-center'>
          Welcome back, UserName !
        </div>
        <p>It's great to see you again.</p>
        <p className='text-xs'>
          Have a room code? Join a room with it:
        </p>
        <div className='flex'>
          <input type='text' placeholder='XXXXXX' className='border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'/>
          <button className='bg-blue-700 text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md px-4 py-2'>
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
          <PublicRoom roomName="David's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
          <PublicRoom roomName="David's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
          <PublicRoom roomName="David's Room" urlImg="https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH_1024x1024.png?v=1691644764" song="1989s" artist="Taylor Swift"/>
        </div>
      </div>
      {
      showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='fixed inset-0 bg-gray-900 opacity-50'></div>
          <div className='modal-container bg-white w-96 rounded-lg p-6 z-50'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>Create a Room</h2>
              <button className='text-gray-600 hover:text-gray-800 text-2xl rounded-md px-2 hover:bg-slate-200'
                onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <p className='font-semibold'>Room name:</p>
            <input className="border border-gray-300 shadow-sm rounded-lg py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-4 w-full" type="text" placeholder="Your Room"/>
            <div className='flex justify-between mt-16'>
              <button onClick={handleCloseModal} className=' hover:bg-slate-200 border border-gray-300 shadow-sm rounded-lg py-2 px-6'>Cancel</button>
              <button className='border border-gray-300 shadow-sm rounded-lg py-2 px-6 bg-blue-700 hover:bg-blue-800 text-white'>Create</button>
            </div>
          </div>
        </div>
      )
    } </div>
  );
};

export default Room;
