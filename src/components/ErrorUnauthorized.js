import React from 'react'
import Unauthorized_Error from '../assets/images/Unauthorized_Error.jpg'

const ErrorUnauthorized = () => {
  return (
    <div className="w-screen h-screen bg-black opacity-90 flex flex-col justify-center items-center ">
      <img className='h-72 w-[30rem]' src={Unauthorized_Error} alt="errorImg" />
      <h1 className="font-bold text-2xl text-white">Not Found!</h1>
    </div>
  )
}

export default ErrorUnauthorized
