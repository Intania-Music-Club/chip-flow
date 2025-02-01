"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { RoomReference } from "next-auth";
import { Check, X } from 'lucide-react';
  
interface ProfileProps {
    name: string;
    image: string;
    roomJoined: RoomReference[];
    bankroll: number;
    isOwnProfile: boolean;
}
  

const Profile: React.FC<ProfileProps> = ({ name, image, roomJoined, bankroll, isOwnProfile}) => {
    const { data:session } = useSession();
    const [displayName, setDisPlayName] = useState(name);
    const handleGoBackClicked = () => {
        window.history.back();
    }
    const reloadPage = () => {
        window.location.reload();
    }
    const totalMatch = roomJoined.length;

    const handleNameChanged = async () => {
        try {
            const response = await fetch("/api/update-name", {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    newName: displayName,
                })
            });

            if(!response.ok) throw new Error("Failed to fetch update-name");
            
            setDisPlayName(displayName);
            alert("New Username Saved Successfully")
            reloadPage();
        } catch(error) {
            console.log(error);
        }
    }

    const handleCanceled = () => {
        setDisPlayName(name);
    }


    return (
    <div className="flex flex-col mx-6">
        <nav className="mt-6 mb-20 text-3xl font-bold hover:cursor-pointer" onClick={handleGoBackClicked}>
            <div>{`<`}</div>
        </nav>
        <div className="flex flex-col items-center">
            <section className="relative w-full min-h-[220px] bg-white flex flex-col justify-center items-center text-black rounded-2xl">
                <div  className="absolute top-[-65px] flex flex-col items-center">
                    <Image 
                        src={image}
                        alt="userImg"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white"
                    />
                    <div className="mt-3 text-2xl font-bold" onClick={() => {}}>
                        {!isOwnProfile ? 
                            <div>{name}</div> : 
                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1">
                                <input
                                    type="text"
                                    placeholder="Display name ..."
                                    spellCheck="false"
                                    onFocus={() => {}}
                                    value={displayName}
                                    onChange={(e) => setDisPlayName(e.target.value)} 
                                    className="text-center rounded-md focus:outline-none focus:ring-4 focus:ring-primary-red"
                                />
                                {displayName !== name ? 
                                    <div className="flex items-center gap-2">
                                        <div onClick={handleNameChanged} className={`transition-all hover:scale-125`}>
                                            <Check />
                                        </div>
                                        <div onClick={handleCanceled} className={`transition-all hover:scale-125`}>
                                            <X />
                                        </div>
                                    </div> :
                                    <></>
                                }
                            </form>
                        }
                    </div>
                    <div className="mt-3 w-full flex justify-evenly gap-2">
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                {totalMatch}
                            </div>
                            <div className="mt-2 flex flex-col justify-center items-center leading-[1.1] font-light">
                                <div>Match</div>
                                <div>Played</div>
                            </div>
                        </div>
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                {(-1000 < bankroll && bankroll < 1000) ? bankroll : `${(bankroll/1000).toFixed(1)}K`}
                            </div>
                            <div className="mt-2 flex flex-col justify-center items-center leading-[1.1] font-light">
                                <div>All-time</div>
                                <div>Earned</div>
                            </div>
                        </div>
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-4xl font-bold">
                                {totalMatch !== 0 ? (bankroll / totalMatch).toFixed(1) : 0}
                            </div>
                            <div className="mt-2 flex flex-col justify-center items-center leading-[1.1] font-light">
                                <div>Profit/</div>
                                <div>Game</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
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