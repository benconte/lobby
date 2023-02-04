import React from 'react'
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import IronRoundedIcon from '@mui/icons-material/IronRounded';
import VapeFreeOutlinedIcon from '@mui/icons-material/VapeFreeOutlined';
import FireplaceOutlinedIcon from '@mui/icons-material/FireplaceOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';

function Amenities() {
  return (
    <div className='w-full my-8 grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <SoupKitchenOutlinedIcon className="text-2xl" />
            <span>kitchen</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <WifiOutlinedIcon className="text-2xl" />
            <span>Wifi</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <TvRoundedIcon className="text-2xl" />
            <span>TV</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <EventAvailableRoundedIcon className="text-2xl" />
            <span>Long term</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <IronRoundedIcon className="text-2xl" />
            <span>Iron</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <VapeFreeOutlinedIcon className="text-2xl" />
            <span>Smoke detector</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <FireplaceOutlinedIcon className="text-2xl" />
            <span>Fireplace</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <PoolOutlinedIcon className="text-2xl" />
            <span>Swimming Pool</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <RestaurantOutlinedIcon className="text-2xl" />
            <span>Restaurant</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <FitnessCenterOutlinedIcon className="text-2xl" />
            <span>GYM</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <MovieOutlinedIcon className="text-2xl" />
            <span>Cinema</span>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center p-5 rounded-lg bg-white border border-solid border-gray-200 shadow text-zinc-600">
            <KitchenOutlinedIcon className="text-2xl" />
            <span>Fridge</span>
        </div>
    </div>
  )
}

export default Amenities