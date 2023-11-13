import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../assets/images/LOGO.png';
const Header = () => {
  return (
    <nav className='bg-[#101010] text-white fixed w-full z-20 top-0 left-0 shadow '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='/' className='flex items-center'>
          <img src={LOGO} className='w-12 h-12 mr-3' alt='WebsiteLogo'/>
          <span className='self-center text-2xl font-semibold whitespace-nowrap  '>
            Rhythm Party
          </span>
        </a>
        <div className='flex md:order-2'>
          <div className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 '>
            <Link to="/signin">Sign In</Link>
          </div>
          <button data-collapse-toggle='navbar-sticky' type='button' className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 0 ' aria-controls='navbar-sticky' aria-expanded='false'>
            <span className='sr-only'>Open main menu</span>
            <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15'/>
            </svg>
          </button>
        </div>
        <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
          <ul className='flex flex-col items-center p-4 md:p-0 ml-24
           font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 gap-8 '>
            <li>
              <a href='/' className='block py-2 pl-3 pr-4 text-white text-[17px] rounded md:hover:text-blue-700  md:p-0 ' aria-current='page'>
                Home
              </a>
            </li>
            <li>
              <a href='#About' className='block py-2 pl-3 pr-4 text-white rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 '>
                About
              </a>
            </li>
            <li>
              <Link to='/rooms' className='block py-2 pl-3 pr-4 text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 '>
                Room
              </Link>
            </li>
            <li>
              <a href='/upload' className='block py-2 pl-3 pr-4 text-orange-600  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 '>
                UpLoad
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

