import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 7 * 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token, user}) {
            if(user) {
                const sessionUser = await User.findOne({ email: user.email});
                if(sessionUser) {
                    token.id = sessionUser._id.toString();
                    token.email = sessionUser.email;
                    token.username = sessionUser.username;
                    token.image = sessionUser.image;
                    token.bankroll = sessionUser.bankroll;
                    token.roomJoining = sessionUser.roomJoining;
                    token.roomJoined = sessionUser.roomJoined;
                }
            }
            return token;
        },
        async session({ session, token}) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.image = token.image;
            session.user.bankroll = token.bankroll;
            session.user.roomJoining = token.roomJoining;
            session.user.roomJoined = token.roomJoined;

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                const userExists = await User.findOne({
                    email: profile.email
                });

                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                        bankroll: 0,
                        roomJoining: null,
                    });
                }
                return true
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST, handler as authOptions}