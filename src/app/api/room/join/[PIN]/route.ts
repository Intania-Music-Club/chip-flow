import Room from "@/models/room";
import { connectToDB } from "@/utils/database";
import {Types} from "mongoose";
import { NextResponse } from "next/server";


export const PATCH = async (req:Request, { params }: {params: {PIN: string}}) => {
    try {
        const { userId } = await req.json();
        await connectToDB();

        const room = await Room.findOne({ PIN: (await params).PIN});

        if(!room) {
            return new NextResponse(`Room PIN: ${params.PIN} not found`, {
                status: 404,
            });
        }
        const userExists = room.players.some((player: any) => (player.userId).toString() === userId);
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