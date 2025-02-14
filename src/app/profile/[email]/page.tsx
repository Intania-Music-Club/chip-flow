"use client"

import Loading from "@/components/Loading"
import Profile from "@/app/profile/components/Profile"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

const OtherProfilePage = () => {
    const {email} = useParams();
    const [isLoading, setIsloading] = useState(true);
    const [user, setUser] = useState({
        userId: '',
        name: '',
        image: '',
        roomJoined: [],
        bankroll: 0
    });

    const [userFound, setUserFound] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/email?email=${email}`, {
                    method: "GET",
                });
                
                if(response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUser(data);
                    setUserFound(true);
                }
                setIsloading(false);
            } catch(error) {
                console.log(error);
            }
        }

        fetchUser();
    }, []);
    return (
        !isLoading ? (
            (userFound ?(
                <Profile 
                    userId={user.userId}
                    name={user.name}
                    image={user.image}
                    roomJoined={user.roomJoined}
                    bankroll={user.bankroll}
                    isOwnProfile={false}
                />
            ) : (
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-center text-4xl font-bold">User Not FOUND</h1>
                    <div className="mt-6 text-center opacity-70"> Can't find the user with email {email+"@gmail.com"}</div>
                </div>
            ))
        ) : <Loading />

    )
}

export default OtherProfilePage