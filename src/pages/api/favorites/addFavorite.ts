import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

async function addFavorite(req: NextApiRequest, res: NextApiResponse) {

    const client = new MongoClient(process.env.MONGODB_URI as string)

    const { usrEmail: email, business: hotel } = req.body
    try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const users = db.collection('users')

        // check if hotel already in favorites
        const booked: any = await users.findOne({ email: email, favorites: { $in: [hotel.id] } })
        if (booked === null) {
            // hotel not in favorite. Add it
            await users.updateOne({ email: email }, { $push: { favorites: hotel.id } })
            res.status(200).json({ success: "Hotel added to favorites", isFavorite: true })
        } else {
            // Hotel already in favorite. Remove it
            await users.updateOne({ email: email }, { $pull: { favorites: hotel.id } })
            res.status(200).json({ success: "Hotel Removed from favorites", isFavorite: false })
        }
    } catch (err: any) {
        res.status(500).json({ message: "Something went wrong. Please try again later", error: err })
    } finally {
        client.close()
    }
}

export default addFavorite