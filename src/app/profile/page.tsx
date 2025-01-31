"use client"

import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'

const ProfilePage = () => {
    const { data:session } = useSession();
    const username = session?.user.name as string;
    const image = session?.user.image as string;
    const roomJoined = session?.user.roomJoined || [];

    return (
        <Profile 
            name={username}
            image={image}
            roomJoined={roomJoined}
            isOwnProfile={true}
        />
    )
}

export default ProfilePage