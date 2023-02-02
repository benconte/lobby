import React, { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

function FilterBox() {
    const [filterBy, setFilterBy] = useState("hotels")
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState("Open")
    const [searchTypeDrop, setsearchTypeDrop] = useState(false)

    return (
        <div className="w-full px-3 md:px-10 block md:flex gap-2 items-start h-auto mb-5">
            <div className='w-full mb-2 md:mb-0 md:w-[300px] flex flex-col gap-2 rounded bg-[#0F172A] h-auto p-3 text-center'>
                <h3 className="text-xl text-[var(--lightblue)] font-medium">Discover the best hotels & results to stay</h3>
                <small className="text-sm text-zinc-400">
                    We provide a variety of the best lodging accomodations for those who need it. Don{"'"}t worry about the quality of the service.
                </small>
                <button type="button" className='outline-none bg-[var(--lightblue)] text-white font-medium border-2 border-solid border-transparent hover:border-white rounded p-2'>Discover</button>
            </div>

            {/* filter section */}
            <div className='block border-2 border-solid border-gray-300 h-full p-3 rounded' style={{ flex: 1 }}>
                <header className="flex items-start w-full gap-2 mb-3">
                    <TuneIcon />
                    <h3>Filters</h3>
                </header>
                <div className="block border-t border-solid w-full py-2">
                    <div className='flex items-center gap-2 w-full'>
                        <input type='search' className="w-full h-10 bg-gray-100 rounded-full px-3 outline-none text-zinc-600" placeholder='Search for a hotel...' />
                        <button type="button" className="flex items-center justify-center text-white cursor-pointer bg-[var(--lightblue)] rounded-full">
                            <SearchIcon className="text-xl m-2" />
                        </button>
                    </div>


                    <div className="flex items-center gap-2 w-full" style={{zIndex: 5}}>
                        {/* city section */}
                        <div className="flex flex-col justify-center gap-1 mt-3 w-40">
                            <p className="flex items-center gap-1">
                                <LocationOnIcon className="text-base text-zinc-600" />
                                <span className="font-medium text-zinc-600">Location</span>
                            </p>
                            <input type="search" placeholder='Search City...' className="w-full h-9 rounded-full outline-none border-transparent px-3 text-zinc-600 bg-gray-100" />
                        </div>

                        {/* filter by section */}
                        <div className="flex flex-col justify-center gap-1 mt-3 w-40">
                            <p className="flex items-center gap-1">
                                <BorderAllRoundedIcon className="text-base text-zinc-600" />
                                <span className="font-medium text-zinc-600">Type</span>
                            </p>
                            <div className="flex relative">
                                <div className="flex items-center h-10 bg-gray-100 px-3 justify-between rounded-full w-40 cursor-pointer" onClick={() => setsearchTypeDrop(!searchTypeDrop)}>
                                    <span className="font-medium text-zinc-600">{filterBy}</span>
                                    <KeyboardArrowDownIcon className="text-base text-zinc-600" />
                                </div>
                                <div className={`${searchTypeDrop ? "flex" : "hidden"} flex-col justify-start gap-2 absolute top-12 rounded w-full bg-white border border-solid border-gray-300`} style={{zIndex: 5}}>
                                    <span className='hover:bg-[var(--lightblue)] text-zin-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setFilterBy("hotels")
                                        setsearchTypeDrop(false)
                                    }}>Hotels</span>
                                    <span className='hover:bg-[var(--lightblue)] text-zin-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setFilterBy("restaurants")
                                        setsearchTypeDrop(false)
                                    }}>Restaurants</span>
                                </div>
                            </div>
                        </div>

                        {/* change status section */}
                        <div className="flex flex-col justify-center gap-1 mt-3 w-40">
                            <p className="flex items-center gap-1">
                                <LockOpenRoundedIcon className="text-base text-zinc-600" />
                                <span className="font-medium text-zinc-600">Status</span>
                            </p>
                            <div className="flex relative">
                                <div className="flex items-center h-10 bg-gray-100 px-3 justify-between rounded-full w-32 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                                    <span>{status}</span>
                                    <KeyboardArrowDownIcon className="text-base text-zinc-600" />
                                </div>
                                <div className={`${isOpen ? "flex" : "hidden"} flex-col justify-start gap-2 absolute top-12 rounded w-full bg-white border border-solid border-gray-300`} style={{zIndex: 5}}>
                                    <span className='hover:bg-[var(--lightblue)] text-zin-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
                                        setStatus("open")
                                        setIsOpen(false)
                                    }}>Open</span>
                                    <span className='hover:bg-[var(--lightblue)] text-zin-600 hover:text-white flex items-center p-1 cursor-pointer' onClick={() => {
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