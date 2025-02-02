import User from "@/models/user";
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { userId, newName } = await req.json();

        await connectToDB();
        const user = await User.findById(userId);
        // console.log(user);
        if(!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        user.username = newName;
        await user.save();

        return new NextResponse("Username update successfully", {
            status: 200,
        })
    } catch(error) {
        console.log(error);
        return new NextResponse("Failed to update username", {
            status: 500,
        })
    }
}