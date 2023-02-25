import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react';
import Header from "@/components/Header"
import Head from "next/head"
import Hotel from "@/components/favorites/Hotel"

function Favorites() {
  const { status, data: session } = useSession()
  const [hotels, setHotels] = useState<any>([])

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/favorites/${session?.user?.email}/getFavorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json()).then((data: any) => {
        console.log(data)
        setHotels(data)
      })
    }
  }, [session, status])
  return (
    <div className="pt-20 w-full min-h-screen bg-gray-100">
      <Head>
        <title>Lobby - Favorites</title>
        <meta name="description" content="A Hotel searching and booking ap" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="w-full my-5 text-center">
        <h3 className="text-2xl text-[var(--blue)] font-medium">Favorites</h3>
        <span className="text-gray-400 text-base">All your favorites in one place for you to review</span>
      </div>

      {hotels && (
        <div className="w-full px-3 md:px-10 py-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {hotels.map((hotel: any, index: Number) => (
            <Hotel hotel={hotel} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
