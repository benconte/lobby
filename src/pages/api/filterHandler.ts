// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { urlParams } from "@/utils/UrlOptions"

type Data = {
  data: any
}

interface params {
  term: string;
  location: string;
  is_closed: boolean;
}

export default async function getData(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const { categories, location, is_closed, limit } = req.query
  let url: string;
  if (req.query.term) {
    url = `https://api.yelp.com/v3/businesses/search?term=${req.query.term}&categories=${categories}&location=${location}&is_closed=${is_closed}&limit=${limit}`
  } else {
    url = `https://api.yelp.com/v3/businesses/search?categories=${categories}&location=${location}&is_closed=${is_closed}&limit=${limit}`
  }

  try {
    const rq: Response = await fetch(url, urlParams)
    const data: Response = await rq.json()
    res.status(200).json({ data: data })
  } catch (err: any) {
    res.status(500).json({ error: "Unable to fetch businesses" })
  }
}
