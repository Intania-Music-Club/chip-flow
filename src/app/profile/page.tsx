"use client"

import Profile from '@/components/Profile'
import { RoomReference } from 'next-auth'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string>("/");
    const [image, setImage] = useState<string>("/");
    const [roomJoined, setRoomJoined] = useState<RoomReference[]>([]);
    const [bankroll, setBankRoll] = useState<number>(0);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (session?.user) {
                setLoading(false);
                setUsername(session.user.name ?? "");
                setImage(session.user.image ?? "");
                setRoomJoined(session.user.roomJoined ?? []);
                setBankRoll(session.user.bankroll ?? 0);
            }
        };
        
        fetchSession();
        
    }, []);


    return (
        loading ? 
        <div className="h-screen flex justify-center items-center text-3xl font-bold">Loading ...</div> :
        <Profile 
            name={username}
            image={image}
            roomJoined={roomJoined}
            bankroll={bankroll}
            isOwnProfile={true}
        />
    )
}

export default ProfilePage