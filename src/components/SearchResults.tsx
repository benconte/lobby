import Image from "next/image"
import Link from "next/link"
import small_0 from "@/assets/icons/yelp_stars/web_and_ios/small/small_0.png"
import small_1 from "@/assets/icons/yelp_stars/web_and_ios/small/small_1.png"
import small_1_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_1_half.png"
import small_2 from "@/assets/icons/yelp_stars/web_and_ios/small/small_2.png"
import small_2_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_2_half.png"
import small_3 from "@/assets/icons/yelp_stars/web_and_ios/small/small_3.png"
import small_3_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_3_half.png"
import small_4 from "@/assets/icons/yelp_stars/web_and_ios/small/small_4.png"
import small_4_half from "@/assets/icons/yelp_stars/web_and_ios/small/small_4_half.png"
import small_5 from "@/assets/icons/yelp_stars/web_and_ios/small/small_5.png"

function SearchResults({ hotel }: any) {
    const handleStars = (hotel: any) => {
        if (hotel.rating === 0) {
            return <Image src={small_0} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating === 1) {
            return <Image src={small_1} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating > 1 && hotel.rating < 2) {
            return <Image src={small_1_half} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating === 2) {
            return <Image src={small_2} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating > 2 && hotel.rating < 3) {
            return <Image src={small_2_half} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating === 3) {
            return <Image src={small_3} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating > 3 && hotel.rating < 4) {
            return <Image src={small_3_half} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating === 4) {
            return <Image src={small_4} alt={hotel.rating} width={70} height={70} />
        } else if (hotel.rating > 4 && hotel.rating < 5) {
            return <Image src={small_4_half} alt={hotel.rating} width={70} height={70} />
        } else {
            return <Image src={small_5} alt={hotel.rating} width={70} height={70} />
        }
    }

    return (
        <Link href={`/business/${hotel.id}`} className="no-underline">
            <div className="w-full flex items-center gap-3 hover:bg-gray-100 p-3 cursor-pointer">
                <div className="w-12 h-12 rounded-md overflow-hidden relative">
                    <Image src={hotel.image_url} alt={hotel.name} fill={true} className="object-cover" loading="eager" />
                </div>
                <div className="grid">
                    <h3 className="truncate text-base text-[var(--green)] font-medium">{hotel.name}</h3>
                    <div className='flex items-center gap-2'>
                        <span>{handleStars(hotel)}</span>
                        <small className='text-gray-400 text-sm'>{hotel.review_count} Reviews</small>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchResults