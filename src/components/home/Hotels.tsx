import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { generateRandomPrice } from "@/utils/priceGenerator"

function Hotels({ business }: { business: any }) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { status, data: session } = useSession()

    const addFavorite = () => {
        if (status === "unauthenticated") {
            alert('Sign in to add favorites')
            return
        }
        fetch("/api/favorites/addFavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usrEmail: session?.user?.email,
                business
            })
        }).then(res => res.json()).then(data => {
            data.isFavorite ? setIsFavorite(true) : setIsFavorite(false); // change icon based on result
        })
    }

    useEffect(() => {
        fetch("/api/favorites/checkFavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usrEmail: session?.user?.email,
                business
            })
        }).then(res => res.json())
            .then(data => {
                if (data.isFavorite) {
                    setIsFavorite(true)
                } else {
                    setIsFavorite(false)
                }

                // something went wrong if we have a message
                if (data.message) {
                    alert(data.message)
                }
            })
    }, [session, business])
    return (
        <div className="w-full h-auto flex flex-col justify-start bg-white rounded-xl hover:shadow-2xl cursor-pointer relative">
            <div className="absolute top-4 right-4 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] hover:bg-white cursor-pointer bg-gray-100 rounded-full z-[1]" onClick={() => addFavorite()}>
                {isFavorite ?
                    <BookmarkIcon className="text-xl m-1 text-[var(--lightblue)]" />
                    :
                    <BookmarkBorderIcon className="text-xl m-1" />
                }
            </div>
            <Link href={`/business/${business.id}`} className="no-underline p-3">
                <div className="relative w-full h-64 z-0 object-cover rounded overflow-hidden">
                    <Image
                        src={business.image_url}
                        alt={business.name}
                        className="object-cover"
                        fill={true}
                        loading="eager"
                        style={{ zIndex: -1 }}
                        sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw" />
                </div>
                <div className="flex flex-col justify-start gap-1 py-2">
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="truncate font-medium text-base text-[var(--dark)]">{business.name}</h4>
                        {business.rating &&
                            <div className="flex items-center">
                                <StarOutlinedIcon className="text-base text-zin-800" />
                                <span className="text-base font-lightbold text-zinc-800">{business.rating}</span>
                            </div>
                        }
                    </div>
                    <p className="text-zinc-600 text-sm font-lightbold m-0">{business.location.display_address[1]}</p>
                    <div className="flex items-center justify-between">
                        <span className={`${business.is_closed ? "bg-red-600" : "bg-green-600"} rounded-full px-3 text-sm py-1 text-white`}>
                            {business.is_closed ? "Closed" : "Open"}
                        </span>
                        <span className="text-sm text-zinc-600">${generateRandomPrice()}</span>
                    </div>
                </div>
            </Link>
        </div>
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