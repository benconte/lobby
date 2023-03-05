// @ts-nocheck
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt'
import { MongoClient } from 'mongodb';
import validator from 'validator';

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {} as any,
            authorize: async (credentials:any) => {
                //whenever we send a sign in request to backend this authorize will fire
                // the credentials will contain all the data comning from our frontend to authorize the user

                const { email, password } = credentials as { email: string; password: string } 

                // first validate email
                if(!validator.isEmail(email)) {
                    return null
                }
                
                // find users in database
                const client = new MongoClient(process.env.MONGODB_URI as string)

                try {
                    await client.connect()
                    const db = client.db(process.env.DB_NAME)
                    const users = db.collection('users')

                    const user = await users.findOne({ email });
                    if(user) {
                        const match = await compare(password, user.password)
                        
                        if (match) {
                            return { _id: user?._id, name: user?.username, email: user?.email }
                        } else {
                            return null
                        }
                    }

                    return null
                } catch(err: any) {
                    console.log("Unable to establish connection to DATABASE. Please try again later", err)
                    return null
                } finally {
                    client.close()
                }
            },
            pages: {
                signin: "/auth/signin"
            }
        })
    ],
    secret: process.env.secret
}

export default NextAuth(authOptions)