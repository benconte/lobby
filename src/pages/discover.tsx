import { useState } from "react"
import Hotels from '@/components/discover/Hotel'
import Head from 'next/head'
import { urlParams } from "@/utils/UrlOptions"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Header from "@/components/Header"

const birdWaiting = require("@/assets/lottiefiles/blue-bird-waiting.json")
const loading = require("@/assets/lottiefiles/loading.json")

interface dt {
  businesses: object;
  setBusinesses: () => void
}

export default function Home({ data }: {data: any}) {
  const [businesses, setBusinesses] = useState(data)
  return (
    <div className="pt-20 w-full min-h-screen bg-gray-100">
      <Head>
        <title>Lobby - Discover</title>
        <meta name="description" content="A Hotel searching and booking ap" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='w-full pt-7'>
        <div className="w-full text-center my-5">
            <h3 className="text-base text-[var(--green)] font-medium">Discover hotels</h3>
            <span className="text-xl text-[var(--dark-blue)] font-medium">Experience luxury like never before</span>
        </div>

        <div className='w-full px-3 md:px-10 py-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
          {businesses.length > 0 ? businesses.map((business:any, index:number) => (
            <Hotels business={business} key={index} />
          )) : (
            <div className="w-screen max-h-72 flex flex-row items-center justify-center ">
              <Player
                autoplay
                loop
                src={loading}
                style={{ width: 300, height: 300 }}
              >
                <Controls visible={false} />
              </Player>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const request = await fetch("https://api.yelp.com/v3/businesses/search?location=LA&categories=hotels&open_now=true&limit=50", urlParams)
  const data = await request.json()
  return {
    props: {
      data: data.businesses
    }
  }
}

// amenities
