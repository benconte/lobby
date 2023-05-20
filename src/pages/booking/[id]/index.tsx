import Header from "@/components/Header"
import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import Details from '@/components/booking/details/Details'
import Loader from "@/components/Loader"
import BookingContext, { BookContext } from "@/context/BookingContext"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from "next/router"

const loading = require("@/assets/lottiefiles/loading.json")

function Booking() {
    const { tabIndex } = useContext(BookContext)
    const { status, data: session } = useSession()
    const router = useRouter();
    const { id } = router.query; // getting the business id from the url params

    const [hotel, setHotel] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin"); // redirect to sign in not authenticated

        fetch(`/api/booking/?id=${id}`).then(res => res.json())
            .then(data => {
                setHotel(data)
                setIsLoading(false)
            })
    }, [session, status, id])

    if (isLoading) {
        return <Loader />
    }
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
