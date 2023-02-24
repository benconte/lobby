import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { urlParams } from '@/utils/UrlOptions';

async function GetFavorites(req: NextApiRequest, res: NextApiResponse) {
    const client = new MongoClient(process.env.MONGODBURI as string)

    const { email } = req.query
    try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const users = db.collection('users')

        // check if hotel already in favorites
        const user: any = await users.findOne({ email: email })
        if (user) {
            let hotels: any = []
            
            // we use for...of because we want each iteration to wait for the fetch
            for (const hotelId of Object.values(user.favorites)) {
                const request = await fetch(`https://api.yelp.com/v3/businesses/${hotelId}`, urlParams)
                const data = await request.json()
                hotels.push(data)
            }
            res.status(200).json(hotels)
        } else {
            res.status(500).json("Unable to get data. Try again later")
        }
    } catch (err: any) {
        res.status(500).json({ message: "Something went wrong. Please try again later", error: err })
    } finally {
        client.close()
    }
}

export default GetFavorites