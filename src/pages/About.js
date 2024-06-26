import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useMusicContext } from '../utils/MusicContext'
import { useAuth } from '../utils/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  const {authUser} = useAuth();
  const {music, setIsActive} = useMusicContext();
    useEffect(()=>{
      if(music!==null && music !==undefined)
        setIsActive(true)
      else
        setIsActive(false)
    },[music])
  const handleCreateAccount =( ) =>{
    if(authUser){
      toast.success("Account already exists");
    }
    else{
      window.location.href = '/signup';
    }
  }
  const handleInstagramClick = ()=>{
      window.open("https://github.com/DungLe2983", '_blank');
  }
  const handleFacebookClick = ()=>{
    window.open("https://github.com/leesoonduck3009", '_blank');
  }
  const handleYoutubeClick = ()=>{
    window.open("https://github.com/thanhpt1110", '_blank');
  }
  return (
    <div >
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
      <Header type='about'/>
       <div className='py-16 bg-black opacity-90 text-white'>
         <div className='max-w-screen-xl mx-auto pt-16 md:px-56 h-full px-4'>
           <div>
               <i className="ri-information-line text-2xl"></i>
              </div>
              <h2 className='font-bold text-4xl mt-2'>About us.</h2>
              <p className='mt-8 text-gray-400'>Established in <span className='text-blue-400'>2023</span>, Rhythm Party stands as a vibrant online community that unites music enthusiasts, offering a unique platform where users can come together to listen, discover, and share their favorite tunes. With a strong emphasis on fostering a sense of connection and collaboration, Rhythm Party goes beyond being a mere music streaming service. This web platform is artist-centric, providing musicians with cutting-edge tools and resources to not only showcase their talent but also to cultivate and expand their musical careers.<br/>
              <br/>
              Boasting an extensive library featuring a diverse range of tracks, Rhythm Party brings together over 50 million songs from a community of 10 million artists. With its commitment to empowering both artists and fans alike, Rhythm Party envisions a future where the joy of music is celebrated and shared collaboratively.</p>
              {!authUser && <p className='mt-16 text-[14px]'>Don't have a free account yet?</p>}

              {!authUser && <button className='px-4 py-2 text-[14px] font-bold rounded mt-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300' onClick={handleCreateAccount} >Create your account</button> }
              <p className='font-bold text-2xl my-8'>Follow us</p>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-row gap-4 items-center cursor-pointer' onClick={handleInstagramClick}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="instagram" className='h-4 w-4' />
                  <p>Instagram</p>
                </div>
                 <div className='flex flex-row gap-4 items-center cursor-pointer' onClick={handleFacebookClick}>
                  <img src="https://www.facebook.com/images/fb_icon_325x325.png" alt="instagram" className='h-4 w-4' />
                  <p>Facebook</p>
                </div>
                 <div className='flex flex-row gap-4 items-center cursor-pointer' onClick={handleYoutubeClick}>
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-youtube-268-721990.png?f=webp" alt="instagram" className='h-4 w-4' />
                  <p>Youtube</p>
                </div>
              </div>
         </div>
       </div>
       <Footer/>
    </div>
  )
}

export default About
