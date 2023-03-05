import HotelIcon from '@mui/icons-material/Hotel';
import React, { useState, useEffect } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from "next/image"
import profile from "@/assets/default.png"
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Link from 'next/link';
import { useRouter } from "next/router"
import { useSession, signOut } from 'next-auth/react';

type user = {
  _id: object;
  username: string;
  email: string;
  profile: string;
  favorites: []
}

function Header() {
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [isSearchVisible, setisSearchVisible] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authUser, setAuthUser] = useState<user>({} as user)
  const router = useRouter()

  const { status, data: session } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true)

      if (session && session.user) {
            console.log(session.user)
            fetch(`/api/getUser/${session?.user?.email}`)
          .then(res => res.json())
          .then(data => {
            setAuthUser(data)
          })
      }

    } else {
      setIsAuthenticated(false)
    }

    if (router.pathname !== "/") setisSearchVisible(true)
  }, [router.pathname, status, session])
  return (
    <div className="w-full z-20 bg-white h-20 fixed top-0 left-0 border-b flex items-center justify-between px-5 lg:px-10">
      <div className="h-full flex items-center gap-3 cursor-pointer">
        <Link href="/" className="no-underline">
          <h3 className='text-3xl font-bold text-[var(--lightblue)] font-dancingScript'>Lobby</h3>
        </Link>
        <div className='hidden md:block w-[1px] h-6 bg-gray-400 mx-1 lg:mx-4'></div>

        <ul className='hidden md:flex items-center gap-3 m-0 list-none'>
          {/* <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>Categories</li> */}
          <Link href="/discover" className="no-underline">
            <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>Discover</li>
          </Link>
          <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>Rooms</li>
          <li className='text-gray-400 text-base cursor-pointer hover:text-zinc-600'>About Us</li>
        </ul>
      </div>
      <div className='flex items-center gap-1 lg:gap-3'>
        {isSearchVisible &&
          <div className='h-10 hidden md:flex items-center bg-gray-100 rounded-full'>
            <input type="search" placeholder='Search for a hotel...' className='w-48 h-full outline-none px-4 bg-transparent border-0 text-gray-700' />
            <SearchIcon className="text-xl text-gray-600 cursor-pointer mr-4" />
          </div>
        }

        {/* <span className='flex items-center justify-center text-gray-500 hover:text-[var(--lightblue)] cursor-pointer hover:bg-gray-100 rounded-full'>
          <SettingsIcon className="text-2xl m-2" />
        </span> */}
        <Link href="/favorites" className="no-underline">
          <span className='flex items-center justify-center text-gray-500 hover:text-[var(--lightblue)] cursor-pointer hover:bg-gray-100 rounded-full'>
            <BookmarkBorderIcon className="text-2xl m-2" />
          </span>
        </Link>
        {isAuthenticated ?
          <div className='relative'>
            <Image src={authUser.profile ? authUser.profile : profile} alt="Profile" className="rounded-full cursor-pointer" width={40} height={40} onClick={() => setProfileDropdown(!profileDropdown)} />
            {/* dropdown */}
            <div className={`bg-white border border-solid border-gray-300 w-40 ${profileDropdown ? "flex top-12" : "hidden top-16"} flex-col gap-3 justify-start rounded absolute  right-0`}>
              <Link href="/profile" className="no-underline">
                <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Profile</span>
              </Link>
              <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Settings</span>
              <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white'>Help</span>
              <span className='flex items-center h-10 px-2 hover:bg-[var(--lightblue)] cursor-pointer hover:text-white' onClick={() => signOut()}>Logout</span>
            </div>
          </div>
          :
          <div>
            <Link href="/auth/signin" className='no-underline text-white text-sm font-medium p-2 rounded bg-[var(--lightblue)]'>
              SignIn
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Header