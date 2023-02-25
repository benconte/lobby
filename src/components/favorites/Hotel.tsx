import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Link from 'next/link';
import Image from 'next/image';

function Hotel({ hotel }: any) {
    return (
        <div className="w-full h-auto flex flex-col justify-start bg-white rounded-xl hover:shadow-2xl cursor-pointer relative">
            <Link href={`/business/${hotel.id}`} className="no-underline p-3">
                <div className="relative w-full h-64 z-0 object-cover rounded overflow-hidden">
                    <Image
                        src={hotel.image_url}
                        alt={hotel.name}
                        className="object-cover"
                        fill={true}
                        loading="eager"
                        style={{ zIndex: -1 }}
                        sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw" />
                </div>
                <div className="flex flex-col justify-start gap-1 py-2">
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="truncate font-medium text-base text-[var(--dark)]">{hotel.name}</h4>
                        {hotel.rating &&
                            <div className="flex items-center">
                                <StarOutlinedIcon className="text-base text-zin-800" />
                                <span className="text-base font-lightbold text-zinc-800">{hotel.rating}</span>
                            </div>
                        }
                    </div>
                    <p className="text-zinc-600 text-sm font-lightbold m-0">{hotel.location.display_address[1]}</p>
                    <div className="flex items-center justify-between">
                        <span className={`${hotel.is_closed ? "bg-red-600" : "bg-green-600"} rounded-full px-3 text-sm py-1 text-white`}>
                            {hotel.is_closed ? "Closed" : "Open"}
                        </span>
                        <span className="text-sm text-zinc-600">$66.4</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Hotel