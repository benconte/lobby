import { NextApiRequest, NextApiResponse } from 'next';
import { urlParams } from "@/utils/UrlOptions"

export default async function getBusinessses(req: NextApiRequest, res: NextApiResponse) {
    const request = await fetch(`https://api.yelp.com/v3/businesses/search?location=LA&categories=hotels&open_now=true&limit=50`, urlParams)
    const data = await request.json()

    res.status(200).json(data.businesses)
}
