import Link from 'next/link';
import { useState, useEffect, useContext } from 'react'
import { BookContext } from '@/context/BookingContext'

function Summary({ hotel }: { hotel: any }) {
  const [checkInDate, setCheckInDate] = useState<any>()
  const [checkoutDate, setCheckoutDate] = useState<any>()
  const { price, bookHotel, setHotel, setIsBookingLoading, isBookingLoading, error } = useContext(BookContext)

  useEffect(() => {
    let today = new Date();
    today.getMonth()

    const nxtMonth = new Date()
    nxtMonth.setMonth(nxtMonth.getMonth() + 1)

    setCheckInDate(new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(today))
    setCheckoutDate(new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(nxtMonth))
  }, [])
  return (
    <div className="w-full lg:w-2/6 rounded bg-white p-4 h-auto">
      <h3>Reservation Summary</h3>
      <div className='w-full border border-solid border-gray-300 bg-gray-50 p-3 mt-4 rounded-lg'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className="block">
            <span className='text-sm text-gray-400'>Check in</span>
            <p className='text-sm font-bold text-[var(--dark-blue)]'>{checkInDate}</p>
            <small className='text-[var(--dark-blue)]'>from 16:00</small>
          </div>
          <div className='w-[1px] h-10 bg-gray-300'></div>
          <div className='block'>
            <span className='text-sm text-gray-400'>Check out</span>
            <p className='text-sm font-bold text-[var(--dark-blue)]'>{checkoutDate}</p>
            <small className='text-[var(--dark-blue)]'>by 12:00</small>
          </div>
        </div>
        <div className='w-full mt-4'>
          <div className="flex w-full items-center gap-2">
            <span className='text-gray-400 text-sm'>You selected:</span>
            <h4 className='text-sm font-bold text-[var(--dark-blue)]'>{hotel.name}</h4>
          </div>
          <Link href="/" className='hover:underline text-[var(--blue)] text-xs'>Change Location</Link>
        </div>
      </div>
      <div className="w-full mt-4">
        <h3 className="text-base font-medium text-[var(--dark-blue)]">Your price summary</h3>
        <div className="w-full mt-3">
          <div className='w-ful flex items-center justify-between'>
            <span className="text-sm text-gray-400">Rooms & offer:</span>
            <span className="font-medium text-sm text-[var(--dark-blue)]">${price}</span>
          </div>
          <div className='w-ful flex items-center justify-between'>
            <span className="text-sm text-gray-400">8% VAT:</span>
            <span className="font-medium text-sm text-[var(--dark-blue)]">$25</span>
          </div>
        </div>
        <p className="w-full flex items-center justify-between mt-3">
          <span className="text-base text-[var(--green)] font-medium">Total Price:</span>
          <span className='text-base text-[var(--green)] font-medium'>${price}</span>
        </p>
      </div>

      {error.length > 0 && <div className="w-full flex items-center py-3 justify-center font-medium rounded px-4 bg-red-400 text-white mt-3">{error}</div>}

      <button type="button" className='w-full rounded-lg text-white bg-[var(--blue)] capitalize outline-none py-3 mt-3 text-sm' onClick={() => {
        setHotel(hotel)
        bookHotel()
      }}>
        {isBookingLoading ? <div className="w-5 h-5 mx-auto border-2 border-solid border-white border-r-transparent rounded-full animate-spin"></div> : 'Request Reservation'}
      </button>
    </div>
  )
}

export default Summary