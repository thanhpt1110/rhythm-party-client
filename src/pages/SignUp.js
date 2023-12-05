import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useMusicContext } from '../utils/MusicContext'
export const SignUp = () => {
  const {setIsActive} = useMusicContext();
  useEffect(()=>{
    setIsActive(false)
  })
  return (
    <div>
      <Header/>
      <section className=' bg-black opacity-90 min-h-screen flex items-center justify-center pt-24'>
      <div className='bg-[#181818] text-white p-5 flex rounded-2xl shadow-lg md:w-1/3 my-8'>
        <div className='md:w-full px-5'>
          <h2 className='text-3xl font-bold text-[#377dee] text-center'>Sign Up</h2>
          <p className='text-sm mt-6 text-[#377dee] font-semibold text-center'>
            Create your account to enjoy Rhythm Party
          </p>
          <form className='mt-8' action='#'>
            <div>
              <label className='block text-gray-200'>Email:</label>
              <input type='email' name='' id='email' placeholder='Enter your email' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' autoFocus autoComplete='' required/>
            </div>
             <div className='mt-4'>
              <label className='block text-gray-200'>UserName:</label>
              <input type='username' name='' id='username' placeholder='Your name' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>
            <div className='mt-4'>
              <label className='block text-gray-200'>Password:</label>
              <input type='password' name='' id='pass' placeholder='Enter password' minLength='6' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>

            <div className='mt-4'>
              <label className='block text-gray-200'>Confirm Password:</label>
              <input type='password' name='' id='pass' placeholder='Confirm your password' minLength='6' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>

            <button type='submit' className='w-full block bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300'>
              Sign Up
            </button>
          </form>

          <div className='mt-7 grid grid-cols-3 items-center text-gray-500'>
            <hr className='border-gray-500'/>
            <p className='text-center text-sm'>OR</p>
            <hr className='border-gray-500'/>
          </div>

          <button className='bg-white border py-3 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 '>
            <img src='https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK' alt='googleimg' className='h-6 w-6'/>
            <span className='ml-4 text-black font-semibold text-[16px]'>SignIn with Google</span>
          </button>

          <div className='text-sm flex gap-1 items-center mt-6'>
            <p>Already have an account?</p>
            <div className='text-right '>
              <Link to='/signin' className='text-sm font-bold hover:underline text-blue-400 hover:text-blue-700 '>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

  )
}

