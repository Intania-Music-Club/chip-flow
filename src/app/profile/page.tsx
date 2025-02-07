"use client"

import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const ProfilePage = () => {

    const {data:session, status} = useSession();

    return (
        status === "authenticated" &&
        <Profile 
            userId={session?.user.id ?? ""}
            name={session?.user.name ?? ""}
            image={session?.user.image ?? ""}
            roomJoined={session?.user.roomJoined ?? []}
            bankroll={session?.user.bankroll ?? 0}
            isOwnProfile={true}
        />
    )
}

export default ProfilePage