import React from 'react';
import {Link} from 'react-router-dom';
import {Footer} from '../components/Footer';
import {useRef, useState} from 'react';


const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setShow(!show);
  };
  const handleCancelUpload = () => {
    setShow(false);
  }
  const handleFileSelection = (event) => {
    event.preventDefault();
    console.log('hello');
    fileInputRef.current.click();

  };
  // const onFileUpload = () => {
  // const formData = new FormData();
  // formData.append('myFile', selectedFile, selectedFile.name);

  // console.log(selectedFile);

  // axios.post('api/uploadfile', formData);
  // };
  return (
    <div>
      <header>
        <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <div className='flex items-center'>
              <img src='https://flowbite.com/docs/images/logo.svg' className='h-8 mr-3' alt='Flowbite Logo'/>
              <span className='self-center text-2xl font-semibold whitespace-nowrap '>
                <Link to='/'>Rhythm Party</Link>
              </span>
            </div>
            <div className='flex md:order-2'>
              <div className='ml-10 flex items-center cursor-pointer'>
                <img className='h-10 w-10 rounded-full' src='https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg' alt='avatar'/>
                <div>
                  <i className='ri-arrow-drop-down-line text-2xl'></i>
                </div>
              </div>
            </div>
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
              <div className='flex flex-col p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:text-xl '>
                Share Your Music with the World
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className=' container py-24  mx-auto px-4 md:px-0 md:w-[60%]'>
        {
        !show ? (
          <form className='min-h-[400px] flex items-center justify-center flex-col gap-4 rounded-xl'
            style={
              {
                backgroundImage: "url('https://stc-id.nixcdn.com/v11/upload_v3/images/bg_upload_full.png')",
                backgroundSize: 'auto',
                backgroundPosition: 'center'
              }
          }>
            <i className='ri-upload-cloud-line text-5xl text-blue-400 '></i>
            <h1 className='text-2xl font-bold '>
              Choose or drag and drop files to upload.
            </h1>
            <div>
              <input type='file'
                onChange={onFileChange}
                accept='*/*'
                style={
                  {display: 'none'}
                }
                ref={fileInputRef}/>
              <button className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded hover:scale-105 duration-300 mt-2'
                onClick={handleFileSelection}>
                Choose File
              </button>

            </div>

          </form>
        ) : (
          <form className=' flex flex-col border border-gray-300 rounded shadow'>
            <div className='flex flex-row justify-between mt-8 md:px-16 gap-8'>
              <div className='flex items-end justify-center w-56 h-56 bg-gradient-to-r from-[#846170] to-[#70929c]'>
                <button className='mb-4 bg-slate-100 flex rounded-lg items-center px-2 gap-2 py-1'>
                  <i class="ri-camera-line"></i>
                  <p className='text-[14px]'>Upload image</p>
                </button>
              </div>
              <div className='w-3/4 flex flex-col'>
                <div className='flex flex-row gap-1 items-center '>
                  <p className='font-bold text-sm'>Title</p>
                  <span className='text-red-600'>*</span>
                </div>
                <input className='w-full border border-gray-300 mt-2 px-2 rounded py-1'
                  placeholder={
                    selectedFile.name
                  }
                  required/>
                <div className='flex flex-row justify-between'>
                  <div className='my-2'>
                    <div className='flex flex-row gap-1 items-center '>
                      <p className='font-bold text-sm'>Artist</p>
                      <span className='text-red-600'>*</span>
                    </div>
                    <input type="text" className='border border-gray-300 px-2 rounded mt-1 py-1 md:w-60' required/>
                  </div>
                  <div className='my-2'>
                    <div className='flex flex-row gap-1 items-center '>
                      <p className='font-bold text-sm'>Genre</p>
                      <span className='text-red-600'>*</span>
                    </div>
                    <select className="border border-gray-300 px-2 rounded mt-1 py-1 pb-1 md:w-60" required>
                      <option value="">None</option>
                      <option value="option1">R&B</option>
                      <option value="option2">Rock</option>
                      <option value="option3">Rap</option>
                      <option value="option4">HipHop</option>
                    </select>
                  </div>
                </div>
                <p className='font-bold text-sm '>Description</p>
                <textarea name="descriptionSong" id="descriptionSong" className=' resize-none h-28 border border-gray-300 px-2 rounded mt-2 py-1' placeholder='Describe your track' cols="20" rows="10"></textarea>
                <p className='font-bold text-sm my-2 '>Lyrics</p>
                <textarea name="lyricSong" id="lyricSong" className=' h-60 border border-gray-300 px-2 rounded py-1' cols="30" rows="10"></textarea>
                <p className='font-bold mt-2'>Privacy</p>
                <div className="flex mt-4 flex-col gap-1">
                  <div>
                    <input type="radio" name="visibility" id="Public"/>
                    <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded ">Public</label>
                  </div>
                  <div>
                    <input type="radio" name="visibility" id="Private"/>
                    <label htmlFor="Private" className="cursor-pointer py-2 px-4 rounded">Private</label>
                  </div>
                  <p className='ml-7 text-xs text-gray-400'>Only you and people share a secret link with will be able to listen to this track</p>
                </div>
              </div>
            </div>
            <div className='flex justify-between px-16 mt-4 py-4 items-center border-gray-200 border-t-[1px]'>
              <div className='flex items-center gap-1'>
                <span className='text-red-600'>*</span>
                <p className='text-xs font-bold'>Require field
                </p>
              </div>
              <div className='flex gap-4 text-sm'>
                <button className='hover:bg-slate-300 px-6 rounded py-2'
                  onClick={handleCancelUpload}>Cancel</button>
                <button className='bg-blue-400 px-6 rounded py-2 text-white hover:bg-blue-500'>Save</button>
              </div>
            </div>
          </form>

        )
      } </main>
      <Footer/>
    </div>
  );
};

export default Upload;
