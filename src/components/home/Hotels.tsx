import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Link from 'next/link';
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

function Hotels({ data }: { data: any }) {
    const { status, data: session } = useSession()

    const addFavorite = () => {
        fetch("/api/addFavorite",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session: session?.user?.email, 
              data
            })}).then(res => res.json()).then(data => console.log(data))
        // db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
    }
    return (
        <Link href={`/business/${data.id}`} className="no-underline">
            <div className="w-full h-auto flex flex-col justify-start bg-white p-3 rounded-xl hover:shadow-2xl cursor-pointer">
                <div className="relative w-full h-64 z-0 object-cover rounded overflow-hidden">
                    <Image
                        src={data.image_url}
                        alt={data.name}
                        className="object-cover"
                        fill={true}
                        loading="eager"
                        style={{ zIndex: -1 }}
                        sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw" />
                    <div className="absolute top-3 right-3 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] cursor-pointer bg-gray-100 rounded-full" onClick={() => addFavorite()}>
                        <BookmarkBorderIcon className="text-xl m-1" />
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-1 py-2">
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="truncate font-medium text-base text-[var(--dark)]">{data.name}</h4>
                        {data.rating &&
                            <div className="flex items-center">
                                <StarOutlinedIcon className="text-base text-zin-800" />
                                <span className="text-base font-lightbold text-zinc-800">{data.rating}</span>
                            </div>
                        }
                    </div>
                    <p className="text-zinc-600 text-sm font-lightbold m-0">{data.location.display_address[1]}</p>
                    <div className="flex items-center justify-between">
                        <span className={`${data.is_closed ? "bg-red-600" : "bg-green-600"} rounded-full px-3 text-sm py-1 text-white`}>
                            {data.is_closed ? "Closed" : "Open"}
                        </span>
                        <span className="text-sm text-zinc-600">$66.4</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Hotels


// <Image
// src={Logo}
// width='100%'
// height='100%'
// objectFit='contain'
// alt='Brand logo'
// />