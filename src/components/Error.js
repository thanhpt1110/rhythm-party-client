import React from 'react'
import error from '../assets/images/Error.png'

const Error = () => {
  return (
    <div className="w-screen h-screen bg-black opacity-90 flex flex-col justify-center items-center ">
      <img className='h-72 w-[30rem]' src={error} alt="errorImg" />
      <h1 className="font-bold text-2xl text-white">Something went wrong. Please try again later!</h1>
    </div>
  )
}

export default Error
