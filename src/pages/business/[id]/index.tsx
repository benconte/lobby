import React, { useEffect, useState } from 'react'
import ImgSlider from "@/components/business/ImgSlider"
import BusinessData from "@/components/business/BusinessData"
import Amenities from "@/components/business/Amenities"
import Map from "@/components/business/Map"
import Time from "@/components/business/Time"
import Header from "@/components/Header"
import Head from 'next/head'
import Loader from "@/components/Loader"
import { useRouter } from 'next/router';


function Business() {
  const [isLoading, setIsLoading] = useState(true)
  const [business, setBusiness] = useState<any>({})
  const router = useRouter();
  const { id } = router.query; // getting the business id from the url params

  useEffect(() => {
    fetch(`/api/business/?id=${id}`).then(res => res.json())
      .then(data => {
        setBusiness(data)
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='w-full pt-20'>
      <Head>
        <title>Lobby - Business</title>
        <meta name="description" content="A Hotel searching and booking ap" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="w-full px-3 md:px-10 md:min-h-screen py-7 bg-gray-100 h-auto overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-3">
          <ImgSlider images={business?.photos} business={business} />
          <BusinessData business={business} />
        </div>
        <Amenities />
        <div className={`w-full grid grid-flow-row-dense grid-cols-1 ${business.hours && "md:grid-cols-2"} gap-4`}>
          <Map coordinates={business.coordinates} />
          {business.hours &&
            <Time hours={business.hours} />
          }
        </div>
      </div>
    </div>
  )
}

export default Business
