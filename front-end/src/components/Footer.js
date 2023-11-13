import React from 'react'

export const Footer = () => {
  return (
    <footer className=" rounded-lg shadow pb-40 bg-black opacity-90">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center ">© 2023 <a href="https://google.com/" className="hover:underline">RhythmParty</a> All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
        <li>
            <a href="#About" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#Policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#Li" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#Contact" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
    </footer>
  )
}

