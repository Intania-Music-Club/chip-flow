"use client"

import { RoomReference } from "next-auth";
import BackButton from "../../../components/BackButton";
import ProfileCard from "./ProfileCard";
  
interface ProfileProps {
    userId: string,
    name: string;
    image: string;
    roomJoined: RoomReference[];
    bankroll: number;
    isOwnProfile: boolean;
}
  

const Profile: React.FC<ProfileProps> = ({ userId, name, image, roomJoined, bankroll, isOwnProfile}) => {
    

    return (
    <div className="flex flex-col mx-6 overflow-hidden">
        <div className="mt-8 mb-16">
            <BackButton size={40}/>
        </div>
        <div className="flex flex-col items-center">
            <ProfileCard 
                userId={userId}
                image={image}
                name={name}
                isOwnProfile={isOwnProfile}
                bankroll={bankroll}
                roomJoined={roomJoined}
            />
        </div>
        <section className="mt-10 p-1 border-b-1">
            <div className="text-xl">Last 10 Matches</div>
        </section>
        <section className="mt-10 p-1 border-b-1">
            <div className="text-xl">Match History</div>
        </section>
    </div>
  )
}

export default Profile