import NextAuth, { NextAuthOptions, Session, User as NextAuthUser, RoomReference } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

interface CustomUser extends NextAuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  bankroll: number;
  roomPINJoining: string | null;
  roomJoined: RoomReference[];
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
    async session({ session }: { session: CustomSession}) {
      await connectToDB();
      const userDB = await User.findOne({email: session.user.email})
      if(!userDB) return session;
      
      session.user.id = userDB._id.toString();
      session.user.email = userDB.email;
      session.user.name = userDB.username;
      session.user.image = userDB.image;
      session.user.bankroll = userDB.bankroll;
      session.user.roomPINJoining = userDB.roomPINJoining;
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
