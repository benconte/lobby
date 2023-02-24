import React from 'react'
import { urlParams } from "@/utils/UrlOptions"
import ImgSlider from "@/components/business/ImgSlider"
import BusinessData from "@/components/business/BusinessData"
import Amenities from "@/components/business/Amenities"
import Map from "@/components/business/Map"
import Time from "@/components/business/Time"
import Header from "@/components/Header"
import Head from 'next/head'

type businessProp = {
  business: any
}

function Business({ business }: businessProp) {
  return (
    <div className='w-full pt-20'>
      <Head>
        <title>Lobby - Business</title>
        <meta name="description" content="A Hotel seaching and booking ap" />
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

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const id = params.id // getting the business id from the context params

  const rqst = await fetch(`https://api.yelp.com/v3/businesses/${id}`, urlParams)
  const data = await rqst.json()
  return {
    props: {
      business: data
    }
  }
}