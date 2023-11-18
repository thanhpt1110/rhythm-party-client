import React, { useState } from 'react';

const Player = () => {
    const [isLiked, setIsLiked] = useState(false);
    const handleIconClick = () => {
            setIsLiked(!isLiked);
    };
    return (
      <div className='z-[99] fixed w-full bottom-0'>
        <div className=' h-20  bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* Left */}
            <div className='flex items-center space-x-4'>
                <img
                    className='hidden md:inline h-10 w-10'
                    src='https://media.pitchfork.com/photos/650de105eacc5b460e151343/master/w_1280%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg'
                    alt='playerImg'
                />
                <div>
                    <h3 className=' font-bold text-base'>Song's Name</h3>
                    <p className=' font-semibold text-xs'>Song's Artist</p>
                </div>
                <i
                    className={isLiked ? 'ri-heart-3-fill text-xs md:text-xl  cursor-pointer' : 'ri-heart-3-line text-xs md:text-xl cursor-pointer'}
                    onClick={handleIconClick}
                    >
                    </i>
            </div>
            {/* Center */}
            <div className='items-center flex md:flex-col justify-evenly '>
                <div className='hidden sm:flex flex-row items-center mt-2'>
                    <button
                        type='button'
                        className='hidden lg:mr-4 lg:block text-white'
                    >
                    </button>
                    <p className='text-white text-xs'>
                        0:00
                    </p>
                    <input
                        type='range'
                        min={0}
                        max={100}
                        className='md:block w-24 md:w-96 h-1 mx-4 md:mx-6 rounded-lg'
                    />
                    <p className='text-white text-xs'>
                        9:99
                    </p>
                    <button
                        type='button'
                        className='hidden lg:ml-4 lg:block text-white '
                    >
                    </button>
                </div>
                <div className='flex items-stretch justify-evenly gap-2 md:gap-14 mt-8 md:mt-0 '>
                    <i className='ri-arrow-left-right-fill button'></i>
                    <i className='ri-rewind-fill button'></i>
                    <i className='ri-play-circle-fill h-10 w-10 md:text-2xl cursor-pointer md:scale-125 hover:scale-125 transition transform duration-100 ease-out text-center'></i>
                    <i className='ri-speed-fill button'></i>
                    <i className='ri-loop-left-fill button'></i>
                </div>

            </div>
            {/* Right */}
            <div className='flex flex-row items-center space-x-1 md:space-x-3 justify-end md:pl-0 md:pr-3 mt-3 md:mt-0'>
                <i className='ri-volume-down-fill button '></i>
                <input
                    className='w-14 md:w-24 mb-[6px] md:mt-3 h-1 rounded-full'
                    type='range'
                    // value=''
                    min={0}
                    max={100}
                />
                <i className='ri-volume-up-fill button'></i>
            </div>
        </div>
      </div>

    );
};

export default Player;
