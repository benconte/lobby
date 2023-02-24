import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useSession } from "next-auth/react"

function ImgSlider({ images, business }: { images: any; business:any }) {
  let settings: object = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { status, data: session } = useSession()
  const addFavorite = () => {
      fetch("/api/addFavorite",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session: session?.user?.email, 
            business
          })}).then(res => res.json()).then(data => console.log(data))
      // db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
  }

  return (
    <div className='w-full md:w-3/6 relative'>
      <div className="absolute top-3 right-3 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] cursor-pointer bg-gray-100 rounded-full z-10" onClick={() => addFavorite()}>
        <BookmarkBorderIcon className="text-xl m-1" />
      </div>
      <Slider {...settings} className="w-full custom-buttons">
        {images.map((img: any, index: number) => (
          <div key={index} className="relative w-full h-64 md:h-96 rounded-lg object-cover overflow-hidden">
            <Image src={img} alt="some radom img" fill={true} loading="eager" className="object-cover" />
          </div>
        ))}

      </Slider>
    </div>
  )
}

export default ImgSlider
