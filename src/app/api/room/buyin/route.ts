import Room from "@/models/room";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface Player {
    userId: string;
    image: string;
    name: string;
    email: string;
    remainingChips: number;
    totalBuyin: number;
}

export const PATCH = async (req:NextRequest) => {
    try {
        const {buyinAmount, roomId, userId} = await req.json();
        // console.log(roomId, userId, buyinAmount);

        await connectToDB();

        const room =  await Room.findById(roomId);
        if(!room) {
            return new NextResponse("Room not founded", {
                status: 404,
            })
        }

        const playerIndex = room.players.findIndex((player: Player) => player.userId.toString() === userId);
        if(playerIndex === -1) {
            return new NextResponse("Player not found in the room", {
                status: 404,
            });
        }

        room.players[playerIndex].totalBuyin += buyinAmount;
        room.players[playerIndex].remainingChips += buyinAmount;

        room.buyins.push({
            userId: userId,
            amount: buyinAmount,
        });

        await room.save();
        
        return new NextResponse("Buy Chips successfully", {
            status: 201,
        });
    } catch(error) {
        console.log(error);
        return new NextResponse("Failed to buy chips", {
            status: 500,
        })
    }
}