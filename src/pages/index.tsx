import { useState, useEffect } from "react"
import FilterBox from '@/components/home/FilterBox'
import Hotels from '@/components/home/Hotels'
import Head from 'next/head'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Header from "@/components/Header"
import Loader from "@/components/Loader"

const loading = require("@/assets/lottiefiles/loading.json")

export default function Home() {
  const [businesses, setBusinesses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/home`).then(res => res.json())
      .then(data => {
        setBusinesses(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="pt-20">
      <Head>
        <title>Lobby - Home</title>
        <meta name="description" content="A Hotel searching and booking ap" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='w-full pt-7'>
        <FilterBox setBusinesses={setBusinesses} />
        <div className='w-full px-3 md:px-10 bg-gray-100 py-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
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