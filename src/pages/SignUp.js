import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useMusicContext } from '../utils/MusicContext'
import { createUser } from '../api/UserApi'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
export const SignUp = () => {
  const {setIsActive} = useMusicContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isWrongPass, setIsWrongPass] = useState(false)
  const [isExistedEmail, setIsExistedEmail] = useState(false);
  const navigate = useNavigate();
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }
  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }
  const handleUsernameChange = (e)=>{
    setUsername(e.target.value);
  }
  const handleConfirmPasswordChange = (e)=>{
    setConfirmPassword(e.target.value);
  }
  useEffect(()=>{
    setIsActive(false)
  })
  const onClickCreateAccount = async (e)=>{
    if(password.length <6 || confirmPassword.length <6 || !email.includes('@'))
    {
      return;
    }
    if(password!==confirmPassword)
    {
      setIsWrongPass(true);
      return;
    }
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      displayName: username
    }
    try{
      const respone = await createUser(user);
      console.log(respone)
      if(respone.status === 409)
        isExistedEmail(true);
      else if(respone.status === 200)
      {
        toast.success("Create account success");
        navigate('/signin')
      }
      else
      {
        toast.error("Create account failed");
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }
  return (
    <div>
      <Header/>
      <ToastContainer position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              className=''
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark" />
      <section className=' bg-black opacity-90 min-h-screen flex items-center justify-center pt-24'>
      <div className='bg-[#181818] text-white p-5 flex rounded-2xl shadow-lg md:w-1/3 my-8'>
        <div className='md:w-full px-5'>
          <h2 className='text-3xl font-bold text-[#377dee] text-center'>Sign Up</h2>
          <p className='text-sm mt-6 text-white font-semibold text-center'>
            Create your account to enjoy <span className='text-violet-800 text-xl'>Rhythm Party</span>
          </p>
          <form className='mt-8' action='#'>
            <div>
              <label className='block text-gray-200'>Email</label>
              <input type='email' name=''onChange={handleEmailChange} value={email} id='email' placeholder='Enter your email' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' autoFocus autoComplete='' required/>
            </div>
             <div className='mt-4'>
              <label className='block text-gray-200'>Display name</label>
              <input type='username' name='' onChange={handleUsernameChange} value={username} id='username' placeholder='Enter your display name' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>
            <div className='mt-4'>
              <label className='block text-gray-200'>Password</label>
              <input type='password' name='' id='pass' onChange={handlePasswordChange} value={password} placeholder='Enter your password' minLength='6' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>

            <div className='mt-4'>
              <label className='block text-gray-200'>Confirm password</label>
              <input type='password' name='' id='pass'onChange={handleConfirmPasswordChange} value={confirmPassword} placeholder='Confirm your password' minLength='6' className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-600 bg-[#181818] text-white' required/>
            </div>
            { isWrongPass ? (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                <strong className="font-bold">Thông báo!</strong>
                <span className="block sm:inline"> Mật khẩu xác nhận không khớp</span>
            </div>): isExistedEmail && (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                <strong className="font-bold">Thông báo!</strong>
                <span className="block sm:inline">Tài khoản này đã tồn tại</span>
            </div>)}
            <button onClick={onClickCreateAccount} type='submit' className='w-full block bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:scale-105 duration-300'>
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
            <span className='ml-4 text-black font-semibold text-[16px]'>Sign in with Google</span>
          </button>

          <div className='text-sm flex gap-1 items-center mt-6'>
            <p>Already have an account?</p>
            <div className='text-right '>
              <Link to='/signin' className='text-sm font-bold hover:underline text-blue-400 hover:text-blue-700 '>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

  )
}

