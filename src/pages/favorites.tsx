import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react';
import Header from "@/components/Header"
import Head from "next/head"
import Hotel from "@/components/favorites/Hotel"
import Router from "next/router"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Link from "next/link"

const noResult = require("@/assets/lottiefiles/no-results.json")
const loading = require("@/assets/lottiefiles/loading.json")


function Favorites() {
  const { status, data: session } = useSession()
  const [hotels, setHotels] = useState<any>([])
  const [isLoading, setIsLoading] = useState<any>(false)

  useEffect(() => {
    setIsLoading(true)
    if (status === "unauthenticated") Router.replace("/auth/signin"); // redirect to sign in not authenticated

    if (status === "authenticated") {
      fetch(`/api/favorites/${session?.user?.email}/getFavorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json()).then((data: any) => {
        console.log(data)
        setIsLoading(false)
        setHotels(data)
      })
    }
  }, [session, status])

  if (status == "authenticated") {
    return (
      <div className="pt-20 w-full min-h-screen bg-gray-100">
        <Head>
          <title>Lobby - Favorites</title>
          <meta name="description" content="A Hotel searching and booking ap" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        {hotels.length > 0 ? (
          <>
            <div className="w-full my-5 text-center">
              <h3 className="text-2xl text-[var(--blue)] font-medium">Favorites</h3>
              <span className="text-gray-400 text-base">All your favorites in one place for you to review</span>
            </div>

            <div className="w-full px-3 md:px-10 py-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {hotels.map((hotel: any, index: Number) => (
                <Hotel hotel={hotel} key={index} />
              ))}
            </div>
          </>
        ) :
          <div className="flex items-center justify-center flex-col gap-4 ">
            {isLoading ?
              <Player
                autoplay
                loop
                src={loading}
                style={{ width: 300, height: 300 }}
              >
                <Controls visible={false} />
              </Player>
              :
              <>
                <Player
                  autoplay
                  loop
                  src={noResult}
                  style={{ width: 300, height: 300 }}
                >
                  <Controls visible={false} />
                </Player>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <h2 className="text-lg text-[var(--dark-blue)] font-medium">Looks like you no favorites</h2>
                  <Link href="/" className='text-[var(--blue)] text-sm underline'>Back to home page</Link>
                </div>
              </>
            }
          </div>
        }
      </div>
    )
  }

  return <div className="w-screen h-screen flex items-center justify-center ">
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

export default Favorites
