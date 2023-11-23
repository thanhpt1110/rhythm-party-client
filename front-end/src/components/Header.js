import React,{useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../assets/images/LOGO.png';
import UserAvartar from './UserAvatar'
const Header = ({type,user}) => {
  const isAuthenticated = user !==null
  const [openMenus, setOpenMenus] = useState(false);
  const Menus = [
    {name : 'Home' , href:'/' , color: 'text-white' },
    {name : 'Room' , href:'/rooms' ,color: 'text-white' },
    {name : 'About' , href:'/about',color: 'text-white'  },
    {name : 'Upload' , href:'/upload' ,color: 'text-orange-600 ' },
  ]
  const [active, setActive] = useState(undefined)
  useEffect(() => {
    switch(type){
      case 'room': setActive(1);break;
      case 'about': setActive(2);break;
      case 'home' : setActive(0);break;
      default:
        break;
    }
  }, [])

  return (
    <nav className='bg-[#101010] text-white fixed w-full z-20 top-0 left-0 shadow '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='/' className='flex items-center'>
          <img src={LOGO} className='w-12 h-12 mr-3' alt='WebsiteLogo'/>
          <span className='self-center text-2xl font-semibold whitespace-nowrap  '>
            Rhythm Party
          </span>
        </a>
        <div className=' relative hidden md:block ml-8 focus:text-white '>
          <button className=" absolute left top-1/2 -translate-y-1/2 px-4">
              <i className="ri-search-line text-gray-400 hover:text-white "></i>
          </button>
           <input
            type="search"
            className=" pl-14 pr-6 py-2 rounded-md bg-[#222222] "
            placeholder="Search"/>
        </div>
        <div className='flex md:order-2'>
          {
            isAuthenticated ? (<UserAvartar user= {user}/>):
            (
            <div className='text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300   rounded font-bold text-sm px-6 py-2 ml-10 md:ml-0 md:mr-0 '>
              <Link to="/signin">Sign In</Link>
            </div>
            )
          }
        </div>
        <button className='inline-flex items-center p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-600 focus:outline-none '
        onClick={()=>setOpenMenus(!openMenus)}>
            {openMenus?<i class="ri-close-line"></i> :<i class="ri-menu-line"></i> }
        </button>
        <ul className={`md:flex md:items-center pl-16 md:pl-0 transition-all duration-500 ease-in w-full md:w-96 md:gap-8 absolute md:static
        ${openMenus ? ' top-20 bg-gray-800 ' : 'top-[-490px]'}`}>
            {Menus.map((menu,index)=>(
              <li key={index} className='md:ml-8 md:my-0 my-7'>
                <a href={menu.href} className={menu.color} onClick={()=>setActive(index)}>
                  <span className={` ${active === index ? 'pb-2 border-b-2' : 'hover:border-b-2 hover:pb-2'} `}>{menu.name}</span>
                </a>
              </li>
            ))}
      </ul>

      </div>
    </nav>
  );
};

export default Header;

