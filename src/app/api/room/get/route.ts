import Room from "@/models/room";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface Player {
    userId: string,
    image: string,
    name: string,
    email: string,
    remainingChips: number,
    totalBuyin: number,
}

interface RoomFromPlayer {
    userId: string,
    remainingChips: number,
    totalBuyin: number,
}


export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const PIN = searchParams.get("PIN");

        if(!PIN) {
            return new NextResponse("PIN is required", { status: 400 });
        }
        await connectToDB();

        const room = await Room.findOne({PIN: PIN});

        if(!room) {
            return new NextResponse(`Room PIN: ${PIN} not founded`, {status: 404})
        }
        // console.log(room);

        const moderator = await User.findOne({_id: room.moderatorId});
        if(!moderator) {
            return new NextResponse(`moderator not found`, {status: 404});
        }

        const userIds = room.players.map((player: RoomFromPlayer) => player.userId);
        const users = await User.find({_id: { $in: userIds}});
        if(!users.length) {
            return new NextResponse(`No User Found`, {status: 404});
        }
        // console.log(room.players);
        // console.log(users);

        const formattedUsers = room.players.map((player: Player) => {
            const user = users.find(u => u._id.toString() === player.userId.toString());
            return {
                userId: player.userId,
                name: user?.username || player.name,
                image: user?.image || player.image,
                email: user?.email || player.email,
                remainingChips: player.remainingChips,
                totalBuyin: player.totalBuyin,
            }
        })

        // console.log(formattedUsers);

        return new NextResponse(JSON.stringify({
            roomId: room._id,
            roomPIN: room.PIN,
            startTime: room.startTime,
            endTime: room.endTime,
            multiplierFactor: room.multiplierFactor,
            moderatorId: room.moderatorId.toString(),
            moderatorName: moderator.username,
            moderatorImg: moderator.image,
            moderatorEmail: moderator.email,
            players: formattedUsers,
            buyins: room.buyins,
            transactions: room.transactions,
        }), {
            status: 200,
        })
    } catch(error) {
        console.log(error);
        return new NextResponse(`Failed to Join Room`, {status: 500});
    }
}