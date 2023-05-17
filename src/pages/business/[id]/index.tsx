import React from 'react'
import { urlParams } from "@/utils/UrlOptions"
import ImgSlider from "@/components/business/ImgSlider"
import BusinessData from "@/components/business/BusinessData"
import Amenities from "@/components/business/Amenities"
import Map from "@/components/business/Map"
import Time from "@/components/business/Time"
import Header from "@/components/Header"
import Head from 'next/head'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Business } from '@/types/business'

const noResult = require("@/assets/lottiefiles/no-results.json")
const loading = require("@/assets/lottiefiles/loading.json")

type businessProp = {
  business: Business | null
}

function Business({ business }: businessProp) {
  console.log(business)
  return (
    <div className='w-full pt-20'>
      <Head>
        <title>Lobby - Business</title>
        <meta name="description" content="A Hotel seaching and booking ap" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {business !== null ?
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
        :
        <div className="flex items-center justify-center ">
          <Player
            autoplay
            loop
            src={loading}
            style={{ width: 300, height: 300 }}
          >
            <Controls visible={false} />
          </Player>
        </div>
      }

    </div>
  )
}

export default Business

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const id = params.id // getting the business id from the context params

  const request = await fetch(`https://api.yelp.com/v3/businesses/${id}`, urlParams)
  const data = await request.json()

  // get reviews also
  const reviewRequest = await fetch(`https://api.yelp.com/v3/businesses/${id}/reviews?limit=20&sort_by=yelp_sort`, urlParams)
  const reviews = await reviewRequest.json();
  data["reviews_data"] = reviews;
  return {
    props: {
      business: data
    }
  }
}