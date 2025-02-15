"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";
import FormattedDate from "@/components/FormattedDate";

type RoomCardProps = {
    roomPIN: string;
}

type Player = {
    name: string;
    image: string;
    totalBuyin: number;
}

type Room = {
    players: Player[];
    startTime: Date;
}

const RoomCard = ({roomPIN} : RoomCardProps) => {
    const router = useRouter();
    const [room, setRoom] = useState<Room | null>(null);
    const [activeChips, setActiveChips] = useState<number>(0);
    useEffect(() => {
        try {
            const fetchRoom = async () => {
                const response = await fetch(`/api/room/get?PIN=${roomPIN}`);
                if(!response.ok) {
                    throw new Error("Failed to fetch room");
                }
                
                const data = (await response.json());
                setRoom({
                    players: data.players,
                    startTime: data.startTime,
                });
            }

            fetchRoom();
        } catch(error) {
            console.log(error);
        }
    }, [roomPIN]);

    useEffect(() => {
        if(room?.players) {
            const totalChip = room.players.reduce((sum, player) => sum + player.totalBuyin, 0);
            setActiveChips(totalChip);
        }
    }, [room?.players]);

    return (
        <div className="bg-black bg-opacity-20 px-5 py-3 rounded-xl flex flex-col gap-2 shadow-lg">
            <div className="flex justify-between items-center gap-x-3">
                {/* PIN */}
                <div className="text-2xl font-bold flex items-center gap-5">
                        <div className="w-3 h-3 bg-green-500 rounded-full"/>
                        <span className="flex gap-1">
                            <span className="opacity-50">#</span>
                            {roomPIN}
                        </span>
                </div>
                
                {/* Join Button */}
                <button
                    onClick={() => {router.push(`/lobby/${roomPIN}`)}}
                    className="bg-primary-red bg-opacity-50 py-2 px-8 rounded-xl font-bold transition-all duration-75 active:scale-95"
                >
                    Join
                </button>
            </div>
            <div className="flex relative mb-10">
                {room?.players.map(({ image }, idx) => (
                        <Image 
                            key={idx}
                            src={image}
                            alt="userImg"
                            width={40}
                            height={40}
                            className="absolute rounded-full"
                            style={{
                                zIndex: room.players.length - idx,
                                marginLeft: idx * 33,
                                boxShadow: "8px 5px 10px rgba(0, 0, 0, 0.5)", // Shadow on bottom-right
                            }}
                        />
                ))}
            </div>
            
            {/* Room Info */}
            <div className="flex justify-between">
                {/* Active Chips */}
                <div className="mt-1 flex items-center gap-2 text-sm opacity-50">
                    Active Chips: {activeChips}
                </div>
                {/* Start Date */}
                <div className="flex items-center gap-2 text-sm opacity-50">
                    {room?.startTime && <FormattedDate timeStamp={room?.startTime}/>}
                </div>
            </div>
        </div>
    )
}

export default RoomCard