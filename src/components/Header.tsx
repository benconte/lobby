import HotelIcon from '@mui/icons-material/Hotel';
import React, { useState } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from "next/image"
import profile from "@/assets/profile.jpg"
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Header() {
  const [filterOption, setFilterOption] = useState("NYC");
  const [profileDropdown, setProfileDropdown] = useState(false)
  return (
    <div className="w-full z-10 bg-white h-20 fixed top-0 left-0 border-b flex items-center justify-between px-2 md:px-10">
      <div className="h-full flex items-center gap-3 cursor-pointer">
        <h3 className='text-3xl font-bold text-[var(--lightblue)] font-dancingScript'>Lobby</h3>
        <div className='hidden md:block w-[1px] h-5 bg-gray-400 mx-4'></div>

        <ul className='hidden md:flex items-center gap-3 m-0 list-none'>
          <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>Categories</li>
          <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>Discover</li>
          <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>Rooms</li>
          <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>About Us</li>
        </ul>
      </div>
      <div className='flex items-center gap-1 md:gap-3'>
        <div className='h-10 hidden md:flex items-center bg-gray-100 rounded-full'>
          <input type="search" placeholder='Search for a hotel...' className='w-48 h-full outline-none px-4 bg-transparent border-0 text-gray-700' />
          <SearchIcon className="text-xl text-gray-600 cursor-pointer mr-4" />
        </div>

        
        <span className='flex items-center justify-center text-gray-500 hover:text-[var(--lightblue)] cursor-pointer hover:bg-gray-100 rounded-full'>
          <SettingsIcon className="text-2xl m-2" />
        </span>
        <span className='flex items-center justify-center text-gray-500 hover:text-[var(--lightblue)] cursor-pointer hover:bg-gray-100 rounded-full'>
          <BookmarkBorderIcon className="text-2xl m-2" />
        </span>

        <div className='w-[1px] h-5 bg-gray-400 hidden md:block md:mx-4'></div>
        
        <div className='relative'>
          <Image src={profile} alt="Profile" className="rounded-full cursor-pointer" width={40} height={40} onClick={() => setProfileDropdown(!profileDropdown)} />
          {/* dropdown */}
          <div className={`bg-white border border-solid border-gray-300 w-40 ${profileDropdown? "flex top-12": "hidden top-16" } flex-col gap-3 justify-start rounded absolute  right-0`}>
            <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Profile</span>
            <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Settings</span>
            <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Help</span>
            <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header