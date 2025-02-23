import NextAuth, { DefaultSession } from "next-auth";
import { Types } from "mongoose"; 

interface RoomReference {
  PIN: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      bankroll: number;
      roomPINJoining: string | null
      roomJoined: RoomReference[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    bankroll: number;
    roomPINJoining: string | null;
    roomJoined: RoomReference[];
  }

  interface RoomReference {
    PIN: string;
  }
}

