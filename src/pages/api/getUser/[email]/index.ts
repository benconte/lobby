// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function getUser(req: NextApiRequest, res: NextApiResponse<any>) {

  const client = new MongoClient(process.env.MONGODB_URI as string)
  const { email } = req.query;

  try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const users = db.collection('users')

        const user = await users.findOne({ email })
        res.status(200).json(user)
    } catch (err: any) {
        res.status(500).json({ message: "Unable to Get user. Please try again later", error: err })
    } finally {
        client.close()
    }
}
