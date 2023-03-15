// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { urlParams } from "@/utils/UrlOptions"

export default async function search(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const { search: term, city } = req.query
    const url: string = `https://api.yelp.com/v3/businesses/search?term=${term}&categories=hotels&location=${city}&limit=15`

    try {
        const rq: Response = await fetch(url, urlParams)
        const data: Response = await rq.json()
        res.status(200).json({ data: data })
    } catch (err: any) {
        res.status(500).json({ error: "Unable to fetch businesses" })
    }
}
