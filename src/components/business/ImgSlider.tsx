import { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useSession } from "next-auth/react"
import BookmarkIcon from '@mui/icons-material/Bookmark';

function ImgSlider({ images, business }: { images: any; business: any }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  let settings: object = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { status, data: session } = useSession()
  const addFavorite = () => {
    if (status === "unauthenticated") {
      alert('Sign in to add favorites')
      return
    }
    fetch("/api/favorites/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usrEmail: session?.user?.email,
        business
      })
    }).then(res => res.json()).then(data => {
      data.isFavorite? setIsFavorite(true): setIsFavorite(false); // change icon based on result
    })
  }

  useEffect(() => {
    fetch("/api/favorites/checkFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usrEmail: session?.user?.email,
        business
      })
    }).then(res => res.json())
      .then(data => {
        if (data.isFavorite) {
          setIsFavorite(true)
        } else {
          setIsFavorite(false)
        }

        // something went wrong if we have a message
        if(data.message) {
          alert(data.message)
        }
      })
  }, [session, business])
  return (
    <div className='w-full md:w-3/6 relative'>
      <div className="absolute top-3 right-3 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] cursor-pointer bg-gray-100 rounded-full z-10" onClick={() => addFavorite()}>
        {isFavorite? 
        <BookmarkIcon className="text-xl m-1 text-[var(--lightblue)]" />
        :
        <BookmarkBorderIcon className="text-xl m-1" />
        }
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
