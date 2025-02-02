import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { JWT } from "next-auth/jwt";
import { Types } from "mongoose";

// Define the custom types for the session
interface RoomJoined {
  roomId: Types.ObjectId;
}

interface CustomUser extends NextAuthUser {
  id: string;
  name: string;
  image?: string;
  bankroll: number;
  roomJoining: {
    roomId: Types.ObjectId;
    roomPIN: string;
    isModerator: boolean;
  } | null;
  roomJoined: RoomJoined[];
}

export interface CustomSession extends Session {
  user: CustomUser;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }: { session: CustomSession, user: CustomUser}) {
      await connectToDB();
      const userDB = await User.findOne({email: session.user.email})
      if(!userDB) return session;
      
      session.user.id = userDB._id.toString();
      session.user.email = userDB.email;
      session.user.name = userDB.username;
      session.user.image = userDB.image;
      session.user.bankroll = userDB.bankroll;
      session.user.roomJoining = userDB.roomJoining;
      session.user.roomJoined = userDB.roomJoined;

      // console.log("real session : ", session);

      return session;
    },

    async signIn({ profile }: { profile: any }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
            bankroll: 0,
            roomJoining: null,
            roomJoined: [],
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
} as NextAuthOptions;

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST };
