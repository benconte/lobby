import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getRandomRooms } from "@/utils/randomRoomCategory"
import { getRandomAmenities } from "@/utils/hotelAmenities"

type RoomCategory = "single" | "double" | "family" | string;

function Hotels({ business }: { business: any }) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { status, data: session } = useSession()
    const [rooms, setRooms] = useState(getRandomRooms())
    const [amenities, setAmenities] = useState(getRandomAmenities())
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
        <Link href={`/business/${business.id}`} className="no-underline">

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
                    <p className="flex items-center gap-1 flex-wrap truncate">
                        {amenities.map((amenity: any, index: number) => (
                            <>
                                <span className="text-sm text-zinc-600 leading-tight" key={index}>{amenity}</span>
                                {index !== amenities.length -1 && <b className="text-gray-400">, </b>}
                            </>
                        ))}
                    </p>
                    <div className="flex items-center mt-2 gap-3">
                        {rooms.map((room: any, index: number) => (
                            <span className="text-sm py-1 px-2 rounded flex items-center justify-center text-zinc-600 bg-gray-200" key={index}>{room}</span>
                        ))}
                    </div>
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