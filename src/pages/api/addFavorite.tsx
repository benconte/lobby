import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

async function BookHotel(req: NextApiRequest, res: NextApiResponse) {

    const client = new MongoClient(process.env.MONGODBURI as string)

    const { session, data: hotel } = req.body

    try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const users = db.collection('users')

          const booked = await users.findOne({ id: hotel.id })

          const usr = await users.find({ email: session.user.email, favorites: { $in: [hotel.id] },}).count()

          if (usr > 1) {
              // hotel already in favorite. Remove it
              res.status(200).json({ success: "Hotel removed from favorites" })
          } else {
            // add if not in favorite
            users.updateMany({_id:session.user.id},{$set:{ favorites:[hotel]}})
            res.status(200).json({ success: "Hotel added to favorites" })
        }
    } catch (err: any) {
        res.status(500).json({ message: "Something went wrong. Please try again later", error: err })
    } finally {
        client.close()
    }
}

export default BookHotel