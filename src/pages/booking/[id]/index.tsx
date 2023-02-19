import Header from "@/components/Header"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Router from "next/router"
import { urlParams } from "@/utils/UrlOptions"
import Details from '@/components/booking/details/Details'
import Payment from '@/components/booking/Payment'
import Confirmation from '@/components/booking/Confirmation'

import DoneIcon from '@mui/icons-material/Done';

function Booking({ hotel }: { hotel: any }) {
    const [tabIndex, setTabIndex] = useState(1)
    return (
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
                <div className="w-full h-auto flex items-center py-2 justify-center gap-2">
                    <div className={`flex items-center gap-2 cursor-pointer after:w-16 after:h-[2px] after:border ${tabIndex >= 1 ? "after:border-solid after:border-[var(--green)]" : "after:border-dashed after:border-gray-400"} after:mx-1`} onClick={() => setTabIndex(1)}>
                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-lg text-sm text-gray-500 ${tabIndex >= 1 && "bg-[var(--green)] text-white"} m-0`}>
                            {tabIndex >= 1 ? (
                                <DoneIcon className="text-lg text-white" />
                            ) : <span>1</span>
                            }
                        </span>
                        <p className={`text-base font-medium ${tabIndex >= 1 && "text-[var(--green)]"}`}>Dates & Rooms</p>
                    </div>
                    <div className={`flex items-center gap-2 cursor-pointer after:w-16 after:h-[2px] after:border ${tabIndex >= 2 ? "after:border-solid after:border-[var(--green)]" : "after:border-dashed after:border-gray-400"} after:mx-1`} onClick={() => setTabIndex(2)}>
                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-lg text-sm text-gray-500 ${tabIndex >= 2 && "bg-[var(--green)] text-white"} m-0`}>
                            {tabIndex >= 2 ? (
                                <DoneIcon className="text-lg text-white" />
                            ) : <span>2</span>
                            }
                        </span>
                        <p className={`text-base font-medium text-gray-400 ${tabIndex >= 2 && "text-[var(--green)]"}`}>Payment</p>
                    </div>
                    <div className={`flex items-center gap-2 cursor-pointer`} onClick={() => setTabIndex(3)}>
                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-lg text-sm text-gray-500 ${tabIndex == 3 && "bg-[var(--green)] text-white"} m-0`}>
                            {tabIndex >= 3 ? (
                                <DoneIcon className="text-lg text-white" />
                            ) : <span>3</span>
                            }
                        </span>
                        <p className={`text-base font-medium text-gray-400 ${tabIndex == 3 && "text-[var(--green)]"}`}>Confirmation</p>
                    </div>
                </div>
                <div className="w-full mt-3">
                    {tabIndex === 1 && <Details hotel={hotel} />}
                    {tabIndex === 2 && <Payment />}
                    {tabIndex === 3 && <Confirmation />}
                </div>
            </div>
        </div>
    )
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