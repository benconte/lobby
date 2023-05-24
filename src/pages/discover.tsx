import { useState, useEffect } from "react"
import Hotels from '@/components/discover/Hotel'
import Head from 'next/head'
import Loader from "@/components/Loader"
import Header from "@/components/Header"

export default function Home() {
  const [businesses, setBusinesses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/discover`).then(res => res.json())
      .then(data => {
        setBusinesses(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <Loader />
  }
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
          {businesses.map((business:any, index:number) => (
            <Hotels business={business} key={index} />
          ))}
        </div>
      </main>
    </div>
  )
}

