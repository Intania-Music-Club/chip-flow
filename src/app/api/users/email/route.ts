import { connectToDB } from "@/utils/database"
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {

    try{
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const emailRequested = searchParams.get("email");
        const email = `${emailRequested}@gmail.com`
        const user = await User.findOne({email: email});
        if(!user) {
            return new NextResponse("User not found", {
                status: 404
            });
        }
        // console.log(user);

        return NextResponse.json({
            userId: user._id,
            name: user.username,
            image: user.image,
            roomJoined: user.roomJoined,
            bankroll: user.bankroll,

        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new NextResponse("Fetching User by email failed", {
            status: 500
        })
    }


    

}