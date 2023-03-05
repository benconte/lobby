import { NextApiRequest, NextApiResponse } from 'next';
// import { ObjectId } from 'mongodb';
import { saveImageToDatabase } from '@/utils/saveImage'; // Replace with the path to your saveImageToDatabase function
import bcrypt, { compare } from 'bcrypt'
import { MongoClient } from 'mongodb';
import { ObjectId } from "bson"

const saltRounds = 10;

export default async function updateProfile(req: NextApiRequest, res: NextApiResponse) {
  const { userId, username, email, image, oldPassword, newPassword } = req.body;
  const client = new MongoClient(process.env.MONGODB_URI as string)
  const salt = await bcrypt.genSalt(saltRounds);

  try {
    // Validate the user ID parameter
    if (!ObjectId.isValid(new ObjectId(userId as string))) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    await client.connect()
    const db = client.db(process.env.DB_NAME)
    const users = db.collection('users')

    const user = await users.findOne({ _id: new ObjectId(userId) });

    // if we have a new image and new password
    if (image && newPassword.length > 0) {
      const match = await compare(oldPassword, user?.password)
      if (match) {
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        await users.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { username, email, password: hashedPassword } });

        await saveImageToDatabase(userId as string, image);
      } else {
        res.status(500).json({ message: "Invalid password. Check your password again" })
        return
      }
    } else if (image && newPassword.length === 0) {
      // only if we have a profile image change
      await saveImageToDatabase(userId as string, image);
    } else if (newPassword.length > 0) {
      // only if we have a password change
      const match = await compare(oldPassword, user?.password)
      if (match) {
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        await users.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { username, email, password: hashedPassword } });

      } else {
        res.status(500).json({ message: "Invalid password. Check your password again" })
        return
      }
    } else {
      // else just update the username and email
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { username, email } });
    }

    // Return a success response
    res.status(200).json({ success: true, match: "test" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}
