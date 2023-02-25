import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import BookmarkIcon from '@mui/icons-material/Bookmark';

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
        <div className="w-full h-auto flex flex-col justify-start bg-white rounded-xl hover:shadow-2xl cursor-pointer relative p-3">
            <div className="absolute top-4 right-4 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] hover:bg-white cursor-pointer bg-gray-100 rounded-full z-[1]" onClick={() => addFavorite()}>
                {isFavorite ?
                    <BookmarkIcon className="text-xl m-1 text-[var(--lightblue)]" />
                    :
                    <BookmarkBorderIcon className="text-xl m-1" />
                }
            </div>

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
                <h4 className="truncate font-medium text-base text-[var(--dark)]">{business.name}</h4>
                <p className="text-zinc-600 text-sm font-lightbold m-0">{business.location.display_address[1]}</p>
                {/* <p className="text-zinc-600 text-sm font-lightbold m-0">{business.display_phone}</p> */}
                <p className="flex items-center gap-1 flex-wrap">
                    <span className="text-sm text-zinc-600 leading-3">Wifi</span>
                    <b className="text-gray-400">.</b>
                    <span className="text-sm text-zinc-600 leading-3">Air conditioning</span>
                    <b className="text-gray-400">.</b>
                    <span className="text-sm text-zinc-600 leading-3">Kitchen</span>
                    <b className="text-gray-400">.</b>
                    <span className="text-sm text-zinc-600 leading-3">Heating</span>
                </p>
                <div className="flex items-center justify-between">
                    {business.rating &&
                        <div className="flex items-center">
                            <StarOutlinedIcon className="text-sm text-yellow-500" />
                            <span className="text-sm font-lightbold text-zinc-600">
                                {parseFloat(business.rating)} <span className="text-gray-400 text-sm">({business.review_count} reviews)</span>
                            </span>
                        </div>
                    }
                    <span className="text-sm text-zinc-600"><b>$256</b> /Night</span>
                </div>
                <div className="flex items-center mt-4 justify-between">
                    <Link href={`/business/${business.id}`} className="no-underline">
                        <span className={`rounded px-5 text-sm py-1 text-zinc-600 border-2 border-solid border-gray-300 hover:bg-[var(--lightblue)] hover:text-white hover:border-transparent cursor-pointer`}>
                            View
                        </span>
                    </Link>
                    <Link href={`/booking/${business.id}`} className="no-underline">
                    <button type="button" className="outline-none text-sm text-white bg-[var(--lightblue)] rounded font-medium py-2 px-3">
                        Book
                    </button>
                    </Link>
                </div>
            </div>
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