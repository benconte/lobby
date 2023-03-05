import { NextApiRequest, NextApiResponse } from 'next';
import { saveImageToDatabase } from '@/utils/saveImage'; // Replace with the path to your saveImageToDatabase function
import { MongoClient } from 'mongodb';

export default async function updateProfile(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    const image = req.body.image;
    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const collection = database.collection('images');
        const result = await collection.insertOne({ profile: image });
        console.log('Image saved to database!');


        // Return a success response
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}
