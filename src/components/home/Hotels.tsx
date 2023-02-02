import Image from "next/image"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

function Hotels({ data }: {data: any}) {
    console.log("data:",data)
    return (
        <div className="w-full h-auto flex flex-col justify-start bg-white p-3 rounded-xl hover:shadow-2xl cursor-pointer">
            <div className="relative w-full h-64 z-0 object-cover rounded overflow-hidden">
                <Image src={data.image_url} alt={data.name} fill={true} loading="lazy" style={{zIndex: -1}} />
                <div className="absolute top-3 right-3 flex items-center justify-center text-[var(--dark)] hover:text-[var(--lightblue)] cursor-pointer bg-gray-100 rounded-full">
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
                    <span className="bg-green-600 rounded-full px-3 text-sm py-1 text-white">Open</span>
                    <span className="text-sm text-zinc-600">$66.4</span>
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