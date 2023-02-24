import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

async function checkFavorites(req: NextApiRequest, res: NextApiResponse) {

    const client = new MongoClient(process.env.MONGODBURI as string)

    const { usrEmail: email, business: hotel } = req.body
    try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const users = db.collection('users')

        // check if hotel already in favorites
        const booked: any = await users.findOne({ email: email, favorites: { $in: [hotel.id] } })
        if (booked === null) {
            // hotel not in favorite. Return false
            res.status(200).json({ isFavorite: false })
        } else {
            // Hotel already in favorite. Return true
            res.status(200).json({ isFavorite: true })
        }
    } catch (err: any) {
        res.status(500).json({ message: "Something went wrong. Please try again later", error: err })
    } finally {
        client.close()
    }
}

export default checkFavorites