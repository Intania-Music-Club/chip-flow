"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image";

const HomePage = () => {
    const { data:session} = useSession();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    const userImg = session?.user?.image ?? "/"
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="text-5xl font-bold mb-10">HomePage</div>
            {(session?.user) ?
                <div className="flex flex-col justify-center items-center gap-10">
                    <Image src={userImg} alt="userImg" width={100} height={100}/>
                    <button type="button" onClick={handleSignOut} className="px-10 py-3 border rounded-xl">
                    Sign Out {session.user.name}
                    </button>
                </div>
                : <></>}
        </div>
    )
}

export default HomePage