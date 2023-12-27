import React from 'react'
import NotFound_Error from '../assets/images/NotFound_Error.jpg'

const ErrorNotFound = () => {
  return (
    <div className="w-screen h-screen bg-black opacity-90 flex flex-col justify-center items-center ">
      <img className='h-72 w-[30rem]' src={NotFound_Error} alt="errorImg" />
      <h1 className="font-bold text-2xl text-white">Not Found!</h1>
    </div>
  )
}

export default ErrorNotFound
