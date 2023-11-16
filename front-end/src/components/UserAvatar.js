import React from 'react'
import { useState } from 'react';
const UserAvatar = ({user}) => {
  const isLogin = user !== null
   const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/google/logout', {
        method: 'GET',
        credentials: 'include', // Đảm bảo gửi cookie với yêu cầu
      });
  
      if (response.ok) {
        // Xử lý khi logout thành công
        console.log('Logout thành công');
        window.location.reload();
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
        <img className="h-10 w-10 rounded-full" src={isLogin ? user.avatar: "https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg"} alt="avatar" />
        <div>
          <i className="ri-arrow-drop-down-line text-2xl text-white"></i>
        </div>
      </button>
      {isOpen && (
        <ul className="absolute mt-2 bg-black rounded-lg shadow-md w-40 text-white">
          <li className="py-2 px-4 hover:bg-gray-800">
            <a href="/profile">Profile</a>
          </li>
           <li className="py-2 px-4 hover:bg-gray-800">
            <a href="/accountsetting">Account Setting</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-800">
            <a href="#a">Report issues</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-800">
            <a href="#a" onClick={logout} >Sign out</a>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserAvatar
