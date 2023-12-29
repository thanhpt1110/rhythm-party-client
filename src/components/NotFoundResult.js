import React from 'react'
import Header from './Header'

const NotFoundResult = ({searchInput}) => {
  return (
    <div>
        <div className='py-16 bg-black opacity-90 text-white w-screen h-screen'>
           <div className='py-40 max-w-screen-xl  mx-auto px-4 text-center '>
              <p className='font-bold text-xl'>We couldn’t find any results for "{searchInput}”.</p>
              <p className='text-base text-gray-400 mt-2'>Please double-check your spelling or try using different keywords.</p>
           </div>
        </div>
    </div>

  )
}

export default NotFoundResult
