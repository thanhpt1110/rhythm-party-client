import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useMusicContext } from '../utils/MusicContext';
import { ToastContainer, toast } from 'react-toastify';

const ReportIssues = () => {
  const { music, setIsActive } = useMusicContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (music !== null && music !== undefined)
      setIsActive(true);
    else
      setIsActive(false);
  }, [music]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle('');
    setDescription('');
    toast.success('Submit support successful');
  };

  return (
    <div>
      <Header />
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
      <div className='py-16 bg-black opacity-90 text-white '>
        <div className='max-w-screen-xl mx-auto pt-16 pl-56 h-full'>
          <div>
            <i className="ri-question-line text-3xl"></i>
            <h2 className='font-bold text-4xl my-4'>Report Issues</h2>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-row gap-2 items-center '>
              <p className='font-semibold '>Title</p>
              <span className='text-red-600'>*</span>
            </div>
            <input type="text" id='title' placeholder='Summary the problem' className='w-2/3 bg-black border border-gray-400 rounded h-12 px-2' required value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className='flex flex-row gap-2 items-center '>
              <p className='font-semibold '>Description</p>
              <span className='text-red-600'>*</span>
            </div>
            <textarea type="text" id='description' placeholder='Give more details' className='w-2/3 h-56 bg-black border border-gray-400 rounded px-2 py-2' required value={description} onChange={(e) => setDescription(e.target.value)} />
            <button className='px-6 py-2 w-[13%] text-[16px] font-bold rounded mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 flex flex-row gap-3'>
                <i class="ri-send-plane-fill"></i>
                <span>Submit</span>
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssues;
