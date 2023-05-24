import React, { useState, useEffect } from "react"
import Image from "next/image"
import profile from "@/assets/default.png"
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from 'next/link';
import { useRouter } from "next/router"
import { useSession, signOut } from 'next-auth/react';
import SearchResults from "@/components/SearchResults"
import ClickAwayListener from 'react-click-away-listener';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

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
  const [isLeftNavVisible, setIsLeftNavVisible] = useState(false)

  const [search, setSearch] = useState<any>("")
  const [city, setCity] = useState<any>("NYC")
  const [searchResult, setSearchResult] = useState<[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState<any>(false)

  const router = useRouter()

  const { status, data: session } = useSession()

  const handleSearch = async (text: string) => {
    setSearch(text)
    setIsSearchOpen(true)

    const req = await fetch(`/api/search?search=${search}&city=${city}`);
    if (!req.ok) return
    const res = await req.json()
    setSearchResult(res.data.businesses)
  }

  const handleClickAway = () => {
    setIsSearchOpen(false)
  };

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true)

      if (session && session.user) {
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
        <div className="block md:hidden cursor-pointer" onClick={() => setIsLeftNavVisible(!isLeftNavVisible)}>
          <MenuIcon className=" text-2xl text-gray-400" />
        </div>
        <Link href="/" className="no-underline">
          <h3 className='text-xl md:text-3xl font-bold text-[var(--lightblue)] font-dancingScript'>Lobby</h3>
        </Link>
        <div className='hidden md:block w-[1px] h-6 bg-gray-400 mx-1 lg:mx-4'></div>

        <ul className='hidden md:flex items-center gap-3 m-0 list-none'>
          <Link href="/discover" className="no-underline">
            <li className='text-gray-400 text-sm md:text-base cursor-pointer hover:text-zinc-600'>Discover</li>
          </Link>
          <li className='text-gray-400 text-sm md:text-base cursor-pointer hover:text-zinc-600'>Rooms</li>
          <Link href="/aboutus" className="no-underline">
            <li className='text-gray-400 text-sm md:text-base cursor-pointer hover:text-zinc-600 truncate'>About us</li>
          </Link>
        </ul>

        {isLeftNavVisible &&
          <div className="fixed top-16 left-0 h-auto px-5 rounded-b-lg  w-full block bg-white border-b-2 border-solid border-[#f7f7f7] py-3 z-40 md:hidden">
            <ul className='flex flex-col justify-center gap-3 m-0 list-none'>
              <Link href="/discover" className="no-underline">
                <li className='text-gray-400 text-sm md:text-base cursor-pointer hover:text-zinc-600'>Discover</li>
              </Link>
              <li className='text-gray-400 text-sm md:text-base cursor-pointer hover:text-zinc-600'>Rooms</li>
              <Link href="/aboutus" className="no-underline">
                <li className='text-gray-400 text-sm md:text-base cursor-pointer hover:text-zinc-600 truncate'>About us</li>
              </Link>
            </ul>
          </div>
        }
      </div>
      <div className='flex items-center gap-1 lg:gap-3'>
        {isSearchVisible &&
          // the clickAway listener will close this search dropdown when user click on a element outside this it's children
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className='h-10 p-1 hidden md:flex items-center bg-gray-100 rounded-full relative'>
              <input type="search" placeholder='Search for a hotel...' className='w-48 h-full outline-none px-3 bg-transparent border-0 text-[var(--dark-blue)]' onChange={(e) => handleSearch(e.target.value)} />
              <input type="text" placeholder="city.." className="h-full w-16 outline-none rounded-r-full text-sm px-2 bg-white text-[var(--blue)] border-0" onChange={(e) => {
                setCity(e.target.value)
                setSearch("")
              }} value={city} />

              {/*show the box only if we have a search */}
              {isSearchOpen &&
                <>
                  {search.length > 0 && city.length > 0 ? (

                    <div className="absolute top-14 right-0 w-80 h-80 bg-white rounded-lg border border-solid border-gray-200 overflow-y-auto overflow-x-none">
                      {searchResult && searchResult.length > 0 && searchResult.map((hotel, index) => (
                        <SearchResults hotel={hotel} key={index} />
                      ))}
                    </div>

                  ) :
                    <div className="absolute top-14 right-0 w-80 h-80 bg-white rounded-lg border border-solid border-gray-200 overflow-y-auto overflow-x-none flex items-center justify-center">
                      <h3 className="text-gray-400 font-medium text-sm">No results found.</h3>
                    </div>
                  }
                </>
              }
            </div>
          </ClickAwayListener>
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
            <Image src={authUser.profile ? authUser.profile : profile} alt="Profile" className="rounded-full cursor-pointer" width={40} height={40} onClick={() => setProfileDropdown(!profileDropdown)} placeholder="blur" blurDataURL="/images/avatar.png" />
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
    </div >
  )
}

export default Header