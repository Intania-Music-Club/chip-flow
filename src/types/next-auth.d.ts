import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";
import { Types } from "mongoose"; 

interface RoomReference {
  roomId: Types.ObjectId;
}

interface RoomJoining {
  roomId: Types.ObjectId;
  roomPIN: string;
  isModerator: boolean;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      bankroll: number;
      roomJoining: RoomJoining | null;
      roomJoined: RoomReference[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    bankroll: number;
    roomJoining: RoomJoining | null;
    roomJoined: RoomReference[];
  }

  interface RoomReference {
    roomId: Types.ObjectId | string; // roomId is now correctly typed as ObjectId or string
  }
}

