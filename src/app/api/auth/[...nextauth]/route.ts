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
  username: string;
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

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: NextAuthUser }) {
      if (user) {
        const sessionUser = await User.findOne({ email: user.email });
        if (sessionUser) {
          token.id = sessionUser._id.toString();
          token.email = sessionUser.email;
          token.name = sessionUser.username;
          token.image = sessionUser.image;
          token.bankroll = sessionUser.bankroll;
          token.roomJoining = sessionUser.roomJoining;
          token.roomJoined = sessionUser.roomJoined;
        }
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession, token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.bankroll = token.bankroll;
      session.user.roomJoining = token.roomJoining;
      session.user.roomJoined = token.roomJoined;

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
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST, handler as authOptions };
