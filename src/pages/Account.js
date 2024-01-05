import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useMusicContext } from '../utils/MusicContext'
import { useAuth } from '../utils/AuthContext'
import api from '../api/Api'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const {music, setIsActive} = useMusicContext();
  const {authUser, setAuthUser} = useAuth();
  const [displayName, setDisplayName] = useState(authUser.displayName);
  const [selectedGender, setSelectedGender] = useState(authUser.gender ? authUser.gender : "None");
  const [email, setEmail] = useState(authUser.email)

  const handleSaveNewAccount = ()=>{
    if (displayName === '') {
        toast.error('Please enter your display name.');
        return;
    }
    const user = {displayName: displayName, gender: selectedGender};
    api.put(`/api/user/${authUser._id}`,user).then(response => {
      toast.success('Update Successfully');
      setAuthUser(response.data.data)

    }).catch(e=>{
      toast.error('Update User Failed!');
    })
      setTimeout(() => {
      window.location.href = '/profile';
    }, 3000);
  }
  const handleClick = (e)=>{
    e.preventDefault();
    handleSaveNewAccount();

  }
  const handleNameOnchange = (e)=>{
    setDisplayName(e.target.value)
  }
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
      useEffect(()=>{
      if(music!==null && music !==undefined)
        setIsActive(true)
      else
        setIsActive(false)
    },[music])
  return (
    <div>
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
      <Header/>
      <div className='py-16 bg-black opacity-90 text-white '>
          <div className='max-w-screen-xl mx-auto pt-16 pl-56 h-full'>
              <div>
                <i className="ri-account-pin-box-line text-3xl mb-4"></i>
              </div>
              <form onSubmit={handleSaveNewAccount}>
                <h2 className='font-bold text-4xl'>Account Settings</h2>
                <div className='mt-12 flex flex-col gap-4'>
                    <p>Display name</p>
                    <input type="text"
                    value={displayName}
                    onChange={handleNameOnchange}
                    required
                    className='w-2/3 bg-black border border-gray-400 rounded h-12 px-2' />
                    <p>Email</p>
                    <input readOnly type="text" value={authUser.email} className='w-2/3 bg-black border border-gray-400 cursor-not-allowed rounded h-12
                    px-2' />
                    <p>Gender</p>
                    <select name="genderUser" id="genderUser"
                    className='w-2/3 bg-black border border-gray-400 rounded h-12 px-2'
                    value={selectedGender}
                    required
                    onChange={handleGenderChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                    <option value="None">None</option>
                    </select>
                    <p>Password</p>
                    <input readOnly type="password" value={`Hello ne`} className='w-2/3 bg-black border border-gray-400  rounded h-12 cursor-not-allowed
                    px-2 ' />
                    <div className='flex flex-row gap-2 items-center'>
                    <input type="checkbox" id="myCheckbox" className='h-4'/>
                    <label for="myCheckbox" className='text-xs text-gray-500 px-2'>Share my registration data with Rhythm Party content providers for marketing purposes.</label>
                    </div>
                    <div className='flex flex-row justify-end gap-4 w-2/3 mt-4 items-center'>
                    <a href='/' className='hover:bg-slate-500 px-6 py-2 rounded'>Cancel</a>
                    <Link to='/profile' onClick={handleClick} className='px-8 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300' >Save</Link>
                    </div>
                </div>
              </form>
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Account
