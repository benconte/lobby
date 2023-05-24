import React from 'react'
import Header from "@/components/Header"
import Head from "next/head"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';

const successAnimation = require("@/assets/lottiefiles/successful.json")

function success() {
    return (
        <div className='w-full pt-20'>
            <Head>
                <title>Lobby - Booking</title>
                <meta name="description" content="A Hotel searching and booking ap" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='w-screen h-screen flex flex-col gap-3'>
                <Player
                    autoplay
                    loop
                    src={successAnimation}
                    style={{ width: 300, height: 300 }}
                >
                    <Controls visible={false} />
                </Player>
                <div className='flex flex-col items-center justify-center gap-1'>
                    <h2 className="text-lg text-[var(--dark-blue)] font-medium">Hotel booked successfully.</h2>
                    <span className='text-gray-400 text-sm'>You will receive an email from the hotel you booked!</span>
                    <Link href="/" className='text-[var(--blue)] text-sm underline'>Back to home page</Link>
                </div>
            </div>
        </div>
    )
}

export default success