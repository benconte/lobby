import Header from "@/components/Header"
import Head from "next/head"
import { useContext, useEffect } from "react"
import { urlParams } from "@/utils/UrlOptions"
import Details from '@/components/booking/details/Details'
import Payment from '@/components/booking/Payment'
import Tabs from '@/components/booking/Tabs'
import Confirmation from '@/components/booking/Confirmation'
import BookingContext, { BookContext } from "@/context/BookingContext"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useSession } from 'next-auth/react';
import Router from "next/router"

const loading = require("@/assets/lottiefiles/loading.json")

function Booking({ hotel }: { hotel: any }) {
    const { tabIndex } = useContext(BookContext)
    const { status, data: session } = useSession()

    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin"); // redirect to sign in not authenticated
    }, [session, status])
    if (status == "authenticated") {
        return (
            <BookingContext>
                <div className='w-full pt-20'>
                    <Head>
                        <title>Lobby - Booking</title>
                        <meta name="description" content="A Hotel seaching and booking ap" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Header />

                    <div className="w-full px-3 md:px-10 min-h-screen py-7 bg-gray-100 h-auto overflow-hidden">
                        {/* breadcrumbs */}
                        {/* <Tabs /> */}
                        <div className="w-full mt-3">
                            {/* {tabIndex === 1 && <Details hotel={hotel} />} */}
                            {/* {tabIndex === 2 && <Payment />} */}
                            {/* {tabIndex === 2 && <Confirmation />} */}
                            <Details hotel={hotel} />
                        </div>
                    </div>
                </div>
            </BookingContext>
        )
    }

    // return a loading state while we check for authentication 
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

export default Booking

export const getServerSideProps = async (context: any) => {
    const { params } = context
    const id = params.id

    const rqst = await fetch(`https://api.yelp.com/v3/businesses/${id}`, urlParams)
    const data = await rqst.json()
    return {
        props: {
            hotel: data
        }
    }
}