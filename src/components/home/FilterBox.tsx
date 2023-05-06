import React, { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import Link from "next/link"

function FilterBox({ setBusinesses }: { setBusinesses: any }) {
    const [term, setTerm] = useState("")
    const [category, setCategory] = useState("hotels")
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState("open")
    const [searchTypeDrop, setsearchTypeDrop] = useState(false)
    const [location, setLocation] = useState("NYC")
    const [limit] = useState(35)

    const fetchData = async () => {
        setBusinesses([])
        let url: string;
        if (term.length > 0) {
            url = `/api/filterHandler?term=${term}&categories=${category}&location=${location}&is_closed=${status === "open" ? false : true}&limit=${limit}`
        } else {
            url = `/api/filterHandler?categories=${category}&location=${location}&is_closed=${status === "open" ? false : true}&limit=${limit}`
        }

        const rq = await fetch(url)
        const data = await rq.json()

        setBusinesses(data.data.businesses)
    }

    return (
        <div className="w-full px-3 md:px-10 block md:flex gap-2 items-start h-auto mb-5">
            <div className='w-full mb-2 md:mb-0 md:w-[300px] flex flex-col gap-2 rounded bg-[#0F172A] h-auto p-3 text-center'>
                <h3 className="text-xl text-[var(--lightblue)] font-medium">Discover the best hotels & results to stay</h3>
                <small className="text-sm text-zinc-400">
                    We provide a variety of the best lodging accomodations for those who need it. Don{"'"}t worry about the quality of the service.
                </small>
                <button type="button" className='h-9 w-full outline-none bg-[var(--lightblue)] text-white font-medium border-2 border-solid border-transparent hover:border-white rounded'>
                    <Link href={`/discover`} className="flex w-full h-full items-center justify-center no-underline m-0 p-0">
                        Discover
                    </Link>
                </button>
            </div>

            {/* filter section */}
            <div className='block border-2 border-solid border-gray-300 h-full p-3 rounded' style={{ flex: 1 }}>
                <header className="flex items-start w-full gap-2 mb-3">
                    <TuneIcon />
                    <h3>Filters</h3>
                </header>
                <div className="block border-t border-solid w-full py-2">
                    <div className='flex items-center gap-2 w-full'>
                        <input type='search' className="w-full h-10 bg-gray-100 rounded-full px-3 outline-none text-zinc-600" placeholder='Search for a hotel...' value={term} onChange={(e) => setTerm(e.target.value)} />
                        <button type="button" className="flex items-center justify-center text-white cursor-pointer bg-[var(--lightblue)] rounded-full" onClick={fetchData}>
                            <SearchIcon className="text-xl m-2" />
                        </button>
                    </div>


                    <div className="flex items-center flex-wrap gap-2 w-full" style={{ zIndex: 5 }}>
                        {/* city section */}
                        <div className="flex flex-col justify-center gap-1 mt-3 w-40">
                            <p className="flex items-center gap-1">
                                <LocationOnIcon className="text-base text-zinc-600" />
                                <span className="font-medium text-zinc-600">Location</span>
                            </p>
                            <input type="search" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Search City...' className="w-full h-9 rounded-full outline-none border-transparent px-3 text-zinc-600 bg-gray-100" />
                        </div>

                        {/* filter by section */}
                        <div className="flex flex-col justify-center gap-1 mt-3 w-auto md:w-36 ">
                            <p className="flex items-center gap-1">
                                <BorderAllRoundedIcon className="text-base text-zinc-600" />
                                <span className="font-medium text-zinc-600">Type</span>
                            </p>
                            <div className="flex relative">
                                <div className="flex items-center gap-5 h-10 bg-gray-100 px-3 justify-between rounded-full w-auto md:w-40 cursor-pointer" onClick={() => setsearchTypeDrop(!searchTypeDrop)}>
                                    <span className="font-medium text-zinc-600">{category}</span>
                                    <KeyboardArrowDownIcon className="text-base text-zinc-600" />
                                </div>
                                <div className={`${searchTypeDrop ? "flex" : "hidden"} flex-col justify-start gap-2 absolute top-12 rounded w-full bg-white border border-solid border-gray-300`} style={{ zIndex: 5 }}>
                                    <span className='hover:bg-[var(--lightblue)] text-zin-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setCategory("hotels")
                                        setsearchTypeDrop(false)
                                    }}>Hotels</span>
                                    <span className='hover:bg-[var(--lightblue)] text-zin-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setCategory("restaurants")
                                        setsearchTypeDrop(false)
                                    }}>Restaurants</span>
                                </div>
                            </div>
                        </div>

                        {/* change status section */}
                        <div className="flex flex-col justify-center gap-1 mt-3 w-auto md:w-20">
                            <p className="flex items-center gap-1">
                                <LockOpenRoundedIcon className="text-base text-zinc-600" />
                                <span className="font-medium text-zinc-600">Status</span>
                            </p>
                            <div className="flex relative">
                                <div className="flex items-center gap-3 h-10 bg-gray-100 px-3 justify-between rounded-full w-auto md:w-32 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                                    <span>{status}</span>
                                    <KeyboardArrowDownIcon className="text-base text-zinc-600" />
                                </div>
                                <div className={`${isOpen ? "flex" : "hidden"} flex-col justify-start gap-2 absolute top-12 rounded w-full bg-white border border-solid border-gray-300`} style={{ zIndex: 5 }}>
                                    <span className='hover:bg-[var(--lightblue)] text-zinc-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setStatus("open")
                                        setIsOpen(false)
                                    }}>Open</span>
                                    <span className='hover:bg-[var(--lightblue)] text-zinc-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setStatus("closed")
                                        setIsOpen(false)
                                    }}>Closed</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBox