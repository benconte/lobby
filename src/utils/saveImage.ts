import { MongoClient, ObjectId } from 'mongodb';


const client = new MongoClient(process.env.MONGODB_URI as string);

export async function saveImageToDatabase(userId: string, image: string) {
    try {
      await client.connect();
      const database = client.db(process.env.DB_NAME);
      const collection = database.collection('users');
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { profile: image } }
      );
      
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
  