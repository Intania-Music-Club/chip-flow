import Room from "@/models/room";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    try {
        const { userId, multiplierFactor } = await req.json();
        await connectToDB();

        const generateRoomPIN = async () => {
            let attempts = 0;
            const maxAttempts = 20;

            while(attempts < maxAttempts) {
                const randomPIN = Math.floor(100000 + Math.random() * 900000).toString();
                // console.log(roomPIN);
                const room = await Room.findOne({PIN: randomPIN});
                
                if(!room) {
                    return randomPIN;
                }

                attempts++;
            }
            
            throw new Error("Failed to generate a unique PIN after multiple attemps.")
        };

        const roomPIN = await generateRoomPIN();
        const newRoom = new Room({ 
            PIN: roomPIN,
            multiplierFactor: multiplierFactor,
            moderatorId: userId,
            players: [{userId}],
        });

        await newRoom.save();

        return new NextResponse(JSON.stringify({
            PIN: newRoom.PIN,
        }), {
            status: 201,
        })
        
    } catch(error) {
        console.log(error);
        return new NextResponse("Falied to create room", {
            status: 500
        })
    }
}