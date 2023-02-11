import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function ImgSlider({ images }: { images: any }) {
  let settings: object = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='w-full md:w-3/6 relative'>
      <div className="absolute top-3 right-3 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] cursor-pointer bg-gray-100 rounded-full z-10">
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
