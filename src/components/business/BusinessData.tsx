import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

function BusinessData({ business }: { business: any }) {
    return (
        <div className='w-full flex flex-col justify-start p-3 h-auto md:h-96 rounded-lg bg-white basis-full'>
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col justify-start gap-1 w-auto">
                    <h3 className="text-2xl font-bold text-[var(--dark)] truncate">{business.name}</h3>
                    <div className="flex items-center flex-wrap gap-2">
                        {business.categories.map((cat: any, index: number) => (
                            <span className="text-sm py-1 px-2 rounded flex items-center justify-center text-zinc-600 bg-gray-200" key={index}>{cat.title}</span>
                        ))}
                    </div>
                </div>
                <p className="flex items-center gap-1">
                    <StarOutlinedIcon className="text-base text-yellow-500" />
                    <span className="text-zinc-600">{business.rating}</span>
                </p>
            </div>
            <p className="text-base text-zinc-600 mt-2"><b>Call us:</b> {business.phone}</p>
            <p className="text-base text-zinc-600 mt-1"><b>Review Count:</b> {business.review_count}</p>
            <p className="text-sm text-gray-400 sm:line-clamp-5 lg:line-clamp-none">Singing Kettle Beach Lodge is the ideal Plettenberg Bay beachfront accommodation. With panoramic sea views overlooking Keurbooms beach; a self-catering lodge perfect for romantic getaways and families. Conveniently situated above the famous Enrico{"'"}s restaurant. Room 1, our Honeymoon room, has a furnished balcony offering views of the Indian Ocean. This more spacious room has a lounge and dining area, flat-screen satellite TV , en-suite bathroom with shower and bath, fireplace and kitchenette.</p>

            <p className="text-base text-zinc-600 mt-2">
                <b>Cost per night:</b> $256
            </p>
            <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                    <h4 className="font-bold text-zinc-600 text-base">Type:</h4>
                    <div className='flex items-center gap-2'>
                        <span className="text-sm py-1 px-2 rounded flex items-center justify-center text-zinc-600 bg-gray-200">Single</span>
                        <span className="text-sm py-1 px-2 rounded flex items-center justify-center text-zinc-600 bg-gray-200">double</span>
                        <span className="text-sm py-1 px-2 rounded flex items-center justify-center text-zinc-600 bg-gray-200">Family</span>
                    </div>
                </div>
                <span className={`${business.hours[0].is_open_now ? "bg-green-600" : "bg-red-600"} rounded px-3 text-sm py-1 text-white`}>{business.hours[0].is_open_now ? "Open" : "Closed"}</span>
            </div>
            <button className="text-base text-white bg-[var(--lightblue)] outline-none rounded-full font-medium p-2 mt-2 hover:bg-[var(--dark)]" type="button">Book Now</button>
        </div>
    )
}

export default BusinessData