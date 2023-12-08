import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserAvatar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {authUser, setAuthUser} = useAuth()
  const toggleMenu = (e) => {
  e.preventDefault();
  setIsOpen(!isOpen);
};

  const onLogout = async (e) => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'GET',
        credentials: 'include', // Đảm bảo gửi cookie với yêu cầu
      });
      console.log('logout response: ' + response.ok);
      if (response.ok) {
        // Xử lý khi logout thành công
        console.log('Logout thành công');
        setAuthUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken')
      } else {
        // Xử lý khi có lỗi trong quá trình logout
        console.error('Logout thất bại');
      }
    } catch (error) {
      console.error('Lỗi kết nối đến máy chủ:', error);
    }
  };
  return (
    <div>
       <button className="ml-10 flex items-center cursor-pointer" onClick={toggleMenu}>
        <img className="h-10 w-10 rounded-full" src={authUser.avatar ? authUser.avatar: "https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg"} alt="avatar" />
        <div>
          <i className="ri-arrow-drop-down-line text-2xl text-white"></i>
        </div>
      </button>
      {isOpen && (
        <ul className="absolute mt-2 bg-black rounded-lg shadow-md w-40 text-white">
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/profile">Profile</Link>
          </li>
           <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/accountsetting">Account Setting</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/report">Report issues</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/" onClick={onLogout} >Sign out</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserAvatar
