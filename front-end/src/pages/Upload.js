import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { useRef, useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("Hello");
    };
    const handleFileSelection = () => {
      fileInputRef.current.click();
    };
    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('myFile', selectedFile, selectedFile.name);

        console.log(selectedFile);

        axios.post('api/uploadfile', formData);
    };
    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:{' '}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
    return (

        <div>
            <header>
                <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow'>
                    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                        <div className='flex items-center'>
                            <img
                                src='https://flowbite.com/docs/images/logo.svg'
                                className='h-8 mr-3'
                                alt='Flowbite Logo'
                            />
                            <span className='self-center text-2xl font-semibold whitespace-nowrap '>
                                <Link to='/'>Rhythm Party</Link>
                            </span>
                        </div>
                        <div className='flex md:order-2'>
                            <div className='ml-10 flex items-center cursor-pointer'>
                                <img
                                    className='h-10 w-10 rounded-full'
                                    src='https://img.freepik.com/premium-photo/cartoonish-3d-animation-boy-glasses-with-blue-hoodie-orange-shirt_899449-25777.jpg'
                                    alt='avatar'
                                />
                                <div>
                                    <i className='ri-arrow-drop-down-line text-2xl'></i>
                                </div>
                            </div>
                        </div>
                        <div
                            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
                            id='navbar-sticky'
                        >
                            <div className='flex flex-col p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:text-xl '>
                                Share Your Music with the World
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className=' container py-24  mx-auto px-4 md:px-0 md:w-[60%]'>
                <form
                    className='min-h-[400px] flex items-center justify-center flex-col gap-4 rounded-xl'
                    style={{
                        backgroundImage:
                            "url('https://stc-id.nixcdn.com/v11/upload_v3/images/bg_upload_full.png')",
                        backgroundSize: 'auto',
                        backgroundPosition: 'center',
                    }}
                >
                    <i className='ri-upload-cloud-line text-5xl text-blue-400 '></i>
                    <h1 className='text-2xl font-bold '>
                        Choose or drag and drop files to upload.
                    </h1>
                    <div>
                        <input
                            type='file'
                            onChange={onFileChange}
                            accept='*/*'
                            // style={{ display: 'none' }}
                            ref={fileInputRef}
                        />
                        <button
                            className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded hover:scale-105 duration-300 mt-2'
                            onClick={handleFileSelection}
                            onChange={onFileChange}
                            ref={fileInputRef}
                        >
                            Choose File
                        </button>

                    </div>
                    {fileData()}
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Upload;
