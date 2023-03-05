import React from 'react'
import Header from "@/components/Header"
import Head from "next/head"

type Props = {}

function aboutus({ }: Props) {
    return (
        <div className="pt-20 w-full min-h-screen bg-white flex justify-center">
            <Head>
                <title>Lobby - Favorites</title>
                <meta name="description" content="A Hotel searching and booking ap" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <div className="w-full md:w-8/12 lg:w-6/12 p-5 h-auto md:rounded-lg">
                <div className="w-full my-5 text-center">
                    <h3 className="text-4xl text-[var(--lightblue)] font-medium font-dancingScript">Lobby</h3>
                    <span className="text-zinc-600 text-sm">Discover Your Next Adventure with Our Comprehensive Hotel Booking Platform</span>
                </div>
                <p className="text-sm text-gray-400 text-start">
                    Welcome to our hotel booking website, where finding your dream accommodations is our top priority. With years of experience in the travel industry, we understand the importance of finding the perfect place to stay. Our mission is to make the process of booking a hotel simple, seamless, and stress-free. We offer a vast selection of hotels and resorts worldwide, ranging from budget-friendly options to luxurious retreats. Our user-friendly search engine enables you to find the ideal property for your needs, whether you are traveling for business or pleasure. Our commitment to personalized service means that our travel experts are always available to answer your questions and provide guidance, from selecting the right hotel to booking flights and other travel arrangements. We are passionate about making your trip unforgettable, and we are dedicated to exceeding your expectations at every turn.
                    <br /><br />
                    At our hotel booking website, we pride ourselves on providing exceptional value and unmatched customer service. Our goal is to make your travel experience as enjoyable and effortless as possible. Our team of experienced professionals has a wealth of knowledge about the travel industry, and we use our expertise to help you find the best deals and the most attractive destinations. Whether you are looking for a romantic getaway or a family-friendly vacation, we have the perfect hotel for you. We believe that travel should be accessible to everyone, which is why we offer competitive prices and flexible booking options. Thank you for choosing our hotel booking website for your travel needs, and we look forward to helping you plan your next adventure.
                </p>

                <footer className="my-10 flex items-center justify-center">
                    <small className="text-sm text-zinc-400">© 2023 Lobby from <b className="text-[var(--blue)]">The Augustin&apos;s</b></small>
                </footer>
            </div>
        </div>
    )
}

export default aboutus