import React from 'react'
import Header from './Header'

const NotFoundResult = ({searchInput}) => {
  return (
    <div>
        <div className='py-16 bg-black opacity-90 text-white w-screen h-screen'>
           <div className='py-40 max-w-screen-xl  mx-auto px-4 text-center '>
              <p className='font-bold text-xl'>No results found for "{searchInput}".</p>
              <p className='text-base text-gray-400 mt-2'>Please make sure you have spelled it correctly, use fewer keywords, or try different keywords</p>
           </div>
        </div>
    </div>

  )
}

export default NotFoundResult
