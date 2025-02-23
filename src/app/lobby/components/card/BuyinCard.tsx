import React, {useState, useEffect} from "react";
import Image from "next/image";
import FormattedDate from "@/components/FormattedDate";

interface Buyin {
    userId: string;
    amount: number;
    timeStamp: Date;
    handleProfileClick: ({userId, email}: {userId: string, email: string}) => void;
}

interface User {
    email: string;
    name: string;
    image: string;
}

const BuyinCard: React.FC<Buyin> = ({
    userId,
    amount,
    timeStamp,
    handleProfileClick,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/id?id=${userId}`);
                if(!response.ok) {
                    throw new Error("Failed to fetch user for BuyinCard");
                }
                const data = await response.json();
                // console.log(data);
                setUser({
                    email: data.user.email,
                    name: data.user.username,
                    image: data.user.image,
                });
                setLoading(false)
            } catch(error) {
                console.log("Unable to fetch user info");
            }
        }

        fetchUser();
    }, [userId])

    if (loading) {
        return <></>
    }
    return (
        <div className="space-y-2 px-3 py-3 bg-black bg-opacity-20 rounded-xl shadow-lg">
            <div className="flex justify-between">
                <div 
                    className="flex items-center gap-4"
                    onClick={() => {handleProfileClick({userId: userId, email: user!.email})}}
                >
                    <Image src={user!.image} alt="userImg" width={30} height={30} className="rounded-full" />
                    {user?.name}
                </div>
                <div className="flex justify-end mx-2">+{amount}</div>
            </div>
            <div className="text-sm opacity-50">
                <FormattedDate timeStamp={timeStamp}/>
            </div>
        </div>
    )
}

export default BuyinCard