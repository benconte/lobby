import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

async function BookHotel(req: NextApiRequest, res: NextApiResponse) {

    const client = new MongoClient(process.env.MONGODBURI as string)

    const { hotel } = req.body

    try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const reservations = db.collection('reservation')

          const booked = await reservations.findOne({ id: hotel.id })
          if (booked?.id === hotel.id) {
            // re-book hotel
            reservations.updateMany({},{$unset:{id:hotel.id}})
            const result = await reservations.insertOne({ hotel });
            console.log(`Hotel with id ${hotel.id} was booked successfully`)
          } else {
            const result = await reservations.insertOne({ hotel });
            console.log(`Hotel with id ${hotel.id} was booked successfully`)
          }
        res.status(200).json({ success: "Hotel booked successfully" })
    } catch (err: any) {
        res.status(500).json({ message: "Unable to establish connection to DATABASE. Please try again later", error: err })
    } finally {
        client.close()
    }
}

export default BookHotel