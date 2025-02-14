import Room from "@/models/room";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { roomId, seller, buyer, amount} = await req.json();
        await connectToDB();

        const roomObjectId = new mongoose.Types.ObjectId(roomId);
        const room = await Room.findById(roomObjectId);
        if(!room) {
            return new NextResponse("Room not found", {
                status: 404,
            });
        }

        const newTransaction = {
            seller,
            buyer,
            amount,
        };

        room.transaction.push(newTransaction);
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