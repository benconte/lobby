import { NextApiRequest, NextApiResponse } from 'next';
import { urlParams } from "@/utils/UrlOptions"

const saltRounds = 10;

export default async function getBusinessData(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const request = await fetch(`https://api.yelp.com/v3/businesses/${id}`, urlParams)
    const data = await request.json()

    // get reviews also
    const reviewRequest = await fetch(`https://api.yelp.com/v3/businesses/${id}/reviews?limit=20&sort_by=yelp_sort`, urlParams)
    const reviews = await reviewRequest.json();
    data["reviews_data"] = reviews;

    res.status(200).json(data)
}
