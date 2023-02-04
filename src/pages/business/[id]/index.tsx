import React from 'react'
import { urlParams } from "@/UrlOptions"
import ImgSlider from "@/components/business/ImgSlider"
import BusinessData from "@/components/business/BusinessData"
import Amenities from "@/components/business/Amenities"
import Map from "@/components/business/Map"
import Time from "@/components/business/Time"

function Business({ business }: { business: any }) {
  console.log(business)
  return (
    <div className="w-full px-3 md:px-10 marker:min-h-screen py-7 bg-gray-100 h-auto overflow-hidden">
      <div className="w-full  flex flex-col md:flex-row items-start justify-start gap-3">
        <ImgSlider images={business?.photos} />
        <BusinessData business={business} />
      </div>
      <Amenities />
      <div className='w-full grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-4'>
        <Map coordinates={business.coordinates} />
        <Time hours={business.hours} />
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

// images
// name + rating(must be pushed to the side with flex)
// categories
// telephone
// review count
// some words in dumyData
// amenities
// booking form. should be displayed flex with the name and other stuff
// map
// open hours table