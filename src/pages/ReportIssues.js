import React,{useEffect} from 'react'
import Header from '../components/Header';
import { useMusicContext } from '../utils/MusicContext';
const ReportIssues = () => {
  const {music, setIsActive} = useMusicContext();
    useEffect(()=>{
      if(music!==null && music !==undefined)
        setIsActive(true)
      else
        setIsActive(false)
    },[music])
  return (
    <div>
      <Header/>
       <div className='py-16 bg-black opacity-90 text-white '>
          <div className='max-w-screen-xl mx-auto pt-16 pl-56 h-full'>
            <div>
                <i className="ri-question-line text-3xl"></i>
              </div>
            <h2 className='font-bold text-4xl my-4'>Report Issues</h2>
            <p className='text-gray-300'>Are you having any trouble ?</p>
             <div className='mt-12 flex flex-col gap-4'>
                <div className='flex flex-row gap-2 items-center '>
                  <p className='font-semibold '>Title</p>
                  <span className='text-red-600'>*</span>
                </div>
                <input type="text" placeholder='Summary the problem' className='w-2/3 bg-black border border-gray-400 rounded h-12 px-2' required />
                <div className='flex flex-row gap-2 items-center '>
                  <p className='font-semibold '>Description</p>
                  <span className='text-red-600'>*</span>
                </div>
                <textarea type="text" placeholder='Give more details' className='w-2/3 h-56 bg-black border border-gray-400 rounded px-2 py-2' required />
              </div>
              <button className='px-6 py-2 text-[16px] font-bold rounded mt-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 flex flex-row gap-3'>
                <i class="ri-send-plane-fill"></i>
                <span>Submit</span>
              </button>
          </div>
        </div>
    </div>
  )
}

export default ReportIssues
