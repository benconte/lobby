import bcrypt from 'bcrypt'
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator';

const saltRounds = 10;

async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    const salt = await bcrypt.genSalt(saltRounds);
    const client = new MongoClient(process.env.MONGODB_URI as string)

    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, salt)

    if (!validator.isLength(username, { min: 3 })) {
        return res.status(400).json({ message: 'Password must be at least 3 characters long' })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email. Email must have an @sign" })
    }

    if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' })
    }

    try {
        await client.connect(); // await for connection to the client
        const db = client.db(process.env.DB_NAME);
        const users = db.collection('users');

        // check if there is an existing user
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const result = await users.insertOne({ username, email, password: hashedPassword, favorites: [] });
        res.status(200).json({ success: "User created successfully", result: result })
    } catch (err: any) {
        res.status(500).json({ message: "Unable to establish connection to DATABASE. Please try again later", error: err })
    } finally {
        client.close()
    }
}

export default CreateUser