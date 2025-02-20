import Room from "@/models/room";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface PlayerInRoom {
    userId: string;
    totalBuyin: number;
    remainingChips: number;
}

export const POST = async (req: Request) => {
    try {
        const { roomId, sellerId, buyerId, amount} = await req.json();
        await connectToDB();

        const roomObjectId = new mongoose.Types.ObjectId(roomId);
        const room = await Room.findById(roomObjectId);
        if(!room) {
            return new NextResponse("Room not found", {
                status: 404,
            });
        }

        const seller = room.players.find((player: PlayerInRoom) => player.userId.toString() === sellerId);
        const buyer = room.players.find((player: PlayerInRoom) => player.userId.toString() === buyerId);

        seller.totalBuyin -= amount;
        buyer.totalBuyin += amount;

        const newTransaction = {
            sellerId: sellerId,
            buyerId: buyerId,
            amount: amount,
        };

        room.transactions.push(newTransaction);
        await room.save();

        return new NextResponse("Transaction completed", {
            status: 201,
        })
    } catch(error) {
        console.log(error);
        return new NextResponse("Failed to create a transaction", {
            status: 500,
        })
    }
}