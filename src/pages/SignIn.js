import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useMusicContext } from '../utils/MusicContext';
import api, { API_URL} from '../api/Api';

const SignIn = () => {
  const homeLink = 'http://localhost:3000';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const handleEnterUserName = (e)=>{
    setUsername(e.target.value);
  }
  const handleEnterPassword = (e)=>{
    setPassword(e.target.value);
  }
  const handleLoginSubmit = (e) => {
  e.preventDefault();
    const account = {username: username, password: password}
    api.post('/auth/login',account).then(respone=>{
      console.log(respone.data)
      if(respone.status===200)
        {
            window.location.href = homeLink; 
        }
      else if (respone.status === 401)
        {
          setIsLoginFailed(true)
        }
    }
    )
  };
  //Google login fucntion
  const googleLogin = ()=>{
    window.location.href = `${API_URL}/auth/google`; 
  };
  const {setIsActive} = useMusicContext();
  useEffect(()=>{
    setIsActive(false)
  })
  const loginLocalAccount = () =>{

  }
  return (
    <div>
      <Header/>
      <div className=' bg-black opacity-90  min-h-screen flex items-center justify-center py-24 '>
      <div className='bg-[#181818] text-white p-5 flex rounded-2xl shadow-lg md:w-1/3'>
        <div className='md:w-full px-5 py-4'>
          <h2 className='text-3xl font-bold text-[#377dee] text-center'>Sign In</h2>
          <form className='mt-6' action='#'>
            <div>
              <label className='block text-gray-200'>Email</label>
              <input type='email' name='' id='email' value={username} onChange={handleEnterUserName} placeholder='Enter your email' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white ' autoFocus autoComplete='' required/>
            </div>

            <div className='mt-4'>
              <label className='block text-gray-200'>Password:</label>
              <input type='password' name='' id='pass' value={password} onChange={handleEnterPassword} placeholder='Enter your password' minLength='6' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>

            <div className='text-right mt-2'>
              <a href='#password-reset' className='text-sm font-semibold text-gray-400 hover:text-blue-700 hover:underline focus:text-blue-700'>
                Forgot Password?
              </a>
            </div>
            { isLoginFailed && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                <strong className="font-bold">Notification! </strong>
                <span className="block sm:inline">The login information is incorrect. Please check again.</span>
            </div>}
            <button type='submit' onClick={handleLoginSubmit} className='w-full block bg-blue-500  text-white font-semibold rounded-lg px-4 py-3 mt-6 text-sm hover:scale-105 duration-300'>
              Sign In
            </button>
          </form>

          <div className='mt-7 grid grid-cols-3 items-center text-gray-500'>
            <hr className='border-gray-400'/>
            <p className='text-center text-sm'>OR</p>
            <hr className='border-gray-400'/>
          </div>

          <button onClick={googleLogin} className='bg-white border py-2 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 '>
            <img src='https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK' alt='googleimg' className='h-6 w-6'/>
            <span className='ml-4 text-black font-semibold'>Sign in with Google</span>
          </button>

          <div className='text-sm flex gap-1 items-center mt-6'>
            <p>If you don't have an account?</p>
            <div className='text-right '>
              <Link to='/signup' className='text-sm font-bold hover:underline text-blue-400 hover:text-blue-700 focus:text-blue-700'>
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
