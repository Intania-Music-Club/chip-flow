import Room from "@/models/room";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (req: NextRequest) => {
    try {
        const { userId, PIN } = await req.json();
        if(!userId || !PIN) {
            return  new NextResponse("Missing parameters", { status: 400 });
        }

        await connectToDB();

        const room = await Room.findOne({ PIN: PIN});

        if(!room) {
            return new NextResponse(`Room PIN: ${PIN} not found`, {
                status: 404,
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return new NextResponse("User not found", { status: 404,})
        }
        user.roomPINJoining = PIN;
        await user.save();
        
        const userExists = room.players?.some((player: any) => String(player.userId) === String(userId));
        //console.log(userExists);
        if(userExists) {
            return new NextResponse("User already in room", {
                status: 200,
            })
        }

        room.players.push({userId: userId});
        await room.save();
        
        return new NextResponse("User added to room successfully", {
            status: 201,
        })
    } catch(error) {
        console.log(error);
        return new NextResponse("Failed to join room", {
            status: 500,
        })
    }
}