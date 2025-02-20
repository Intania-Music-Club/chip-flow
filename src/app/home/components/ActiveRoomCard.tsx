"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import Image from "next/image";
import FormattedDate from "@/components/FormattedDate";
import { motion } from "framer-motion";

type RoomCardProps = {
    roomPIN: string;
    isTitleVisible: boolean;
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

const ActiveRoomCard = ({roomPIN, isTitleVisible} : RoomCardProps) => {
    const { data:session } = useSession();
    const router = useRouter();
    const [room, setRoom] = useState<Room | null>(null);
    const [activeChips, setActiveChips] = useState<number>(0);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isRoomFetched, setIsRoomFetched] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);


    useEffect(() => {
        if(isTitleVisible && isRoomFetched) {
            const timer = setTimeout(() => {
                setIsCardVisible(true);
            }, 300)
            return () => {
                if(timer) clearTimeout(timer)
            }
        }
    }, [isTitleVisible, isRoomFetched])

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
        } finally {
            setIsRoomFetched(true);
        }
    }, [roomPIN]);

    useEffect(() => {
        if(room?.players) {
            const totalChip = room.players.reduce((sum, player) => sum + player.totalBuyin, 0);
            setActiveChips(totalChip);
        }
    }, [room?.players]);

    const handleRoomJoining = async () => {
        if(roomPIN.length === 6) {
          if(!session) {
            console.error("User is not authenticated");
          }
          try {
            const response = await fetch(`/api/room/join`, {
              method: "PATCH",
              body: JSON.stringify({
                userId: session?.user.id,
                PIN: roomPIN,
              })
            });
    
            if(!response.ok) {
              alert(`There's no Room PIN: ${roomPIN}`);
              throw new Error(`Failed to join room with PIN: ${roomPIN}`)
            }
            router.push(`/lobby/${roomPIN}`);
          } catch(error) {
            console.log(error);
          }
        } else {
          alert("Please provide a 6 digits PIN")
        }
      }

    return (
        <div className={`bg-black bg-opacity-20 px-5 py-4 rounded-xl flex flex-col gap-2 shadow-lg transition-all duration-1000 ${
            isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}>
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
                {
                    <motion.button
                        onClick={() => {setIsButtonPressed(true); handleRoomJoining();}}
                        disabled={isButtonPressed}
                        className="bg-primary-red bg-opacity-50 py-2 px-8 rounded-xl font-bold active:scale-95"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            y: {
                                delay: 1.5,
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              },
                              opacity: {
                                delay: 1.5,
                                duration: 0.5,
                                ease: "easeOut",
                              },
                        }}
                    >
                        Join
                </motion.button>
                }
                
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

export default ActiveRoomCard