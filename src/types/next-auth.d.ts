import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      image?: string;
      bankroll: number;
      roomJoining: any;
      roomJoined: any;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    image?: string;
    bankroll: number;
    roomJoining: any;
    roomJoined: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
    image?: string;
    bankroll: number;
    roomJoining: any;
    roomJoined: any;
  }
}
