import { useState } from 'react'
import Summary from './Summary'
import Image from "next/image"
import small_0 from "@/assets/icons/yelp_stars/web_and_ios/small/small_0.png"
import small_1 from "@/assets/icons/yelp_stars/web_and_ios/small/small_1.png"
import small_1_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_1_half.png"
import small_2 from "@/assets/icons/yelp_stars/web_and_ios/small/small_2.png"
import small_2_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_2_half.png"
import small_3 from "@/assets/icons/yelp_stars/web_and_ios/small/small_3.png"
import small_3_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_3_half.png"
import small_4 from "@/assets/icons/yelp_stars/web_and_ios/small/small_4.png"
import small_4_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_4_half.png"
import small_5 from "@/assets/icons/yelp_stars/web_and_ios/small/small_5.png"

const stars = {
  0: small_0,
  1: small_1,
  1.5: small_1_half,
  2: small_2,
  2.5: small_2_half,
  3: small_3,
  3.5: small_3_half,
  4: small_4,
  4.5: small_4_half,
  5: small_5,
}

function Details({ hotel }: { hotel: any }) {
  const [roomType, setRoomType] = useState("single")

  // get one month from now
  const calcMonth = () => {
    var now = new Date(); // get current date and time
    now.setMonth(now.getMonth() + 1); // add one month to current date
    // var oneMonthFromNow = now.toLocaleDateString(); // format the date as a string
    // console.log(oneMonthFromNow); // output: e.g. "3/19/2023" (depending on the user's locale)

    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(now) // output: 19 March 2023
  }

  calcMonth()
  const handleStars = () => {
    if (hotel.rating === 0) {
      return <Image src={small_0} alt={hotel.rating} />
    } else if (hotel.rating === 1) {
      return <Image src={small_1} alt={hotel.rating} />
    } else if (hotel.rating > 1 && hotel.rating < 2) {
      return <Image src={small_1_half} alt={hotel.rating} />
    } else if (hotel.rating === 2) {
      return <Image src={small_2} alt={hotel.rating} />
    } else if (hotel.rating > 2 && hotel.rating < 3) {
      return <Image src={small_2_half} alt={hotel.rating} />
    } else if (hotel.rating === 3) {
      return <Image src={small_3} alt={hotel.rating} />
    } else if (hotel.rating > 3 && hotel.rating < 4) {
      return <Image src={small_3_half} alt={hotel.rating} />
    } else if (hotel.rating === 4) {
      return <Image src={small_4} alt={hotel.rating} />
    } else if (hotel.rating > 4 && hotel.rating < 5) {
      return <Image src={small_4_half} alt={hotel.rating} />
    } else {
      return <Image src={small_5} alt={hotel.rating} />
    }
  }

  console.log(hotel)
  return (
    <div className='w-full flex flex-col md:flex-row items-start gap-3'>
      <div className="w-full bg-white p-3 rounded">
        <div className="w-full flex items-start gap-3 p-3 border-2 border-solid border-gray-200 rounded-lg">
          {/* hotell info card */}
          <div className="w-48 h-52 rounded relative overflow-hidden">
            <Image
              src={hotel.image_url}
              alt={hotel.name}
              className="object-cover"
              fill={true}
              loading="eager"
              sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw" />
          </div>
          <div className='flex-1'>
            <h3 className="text-base text-[var(--green)] font-medium">{hotel.name}</h3>
            <span className="text-lg text-[var(--dark-blue)] font-medium">King bed stylish Appartement with Loft style Family Room</span>
            <div className='flex items-center gap-2'>
              <span>{handleStars()}</span>
              {/* <b className='text-base text-[var(--dark-blue)]'>{hotel.rating}</b> */}
              <small className='text-gray-400 text-sm'>{hotel.review_count} Reviews</small>
            </div>
            <div className='flex items-center gap-2 my-2'>
              <span className={`text-sm py-1 px-1 rounded flex items-center justify-center cursor-pointer ${roomType === "single" ? "text-white font-medium bg-[var(--lightblue)]" : "text-zinc-600 bg-gray-200"}`} onClick={() => setRoomType("single")}>Single</span>
              <span className={`text-sm py-1 px-1 rounded flex items-center justify-center cursor-pointer ${roomType === "double" ? "text-white font-medium bg-[var(--lightblue)]" : "text-zinc-600 bg-gray-200"}`} onClick={() => setRoomType("double")}>double</span>
              <span className={`text-sm py-1 px-1 rounded flex items-center justify-center cursor-pointer ${roomType === "family" ? "text-white font-medium bg-[var(--lightblue)]" : "text-zinc-600 bg-gray-200"}`} onClick={() => setRoomType("family")}>Family</span>
            </div>

            {/* good to know section */}
            <div className="mt-4">
              <h3 className='font-medium text-base text-[var(--dark-blue)]'>Good to know</h3>
              <p className='text-gray-400 text-sm'>
                Free cancellation 10 days before end of rent <br />
                Your account will be charged 1 month from now. If you cancel by 11:59PM on {calcMonth()} you{`'`}ll get your money back!

              </p>
            </div>
          </div>
        </div>
      </div>
      <Summary />
    </div>
  )
}

export default Details