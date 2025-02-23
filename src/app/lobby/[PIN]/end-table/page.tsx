"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Player {
    userId: string;
    image: string;
    name: string;
    email: string;
    remainingChips: number;
    totalBuyin: number;
}

interface Room {
    players: Player[];
}

const EndTablePage = () => {
    const pathname = usePathname();
    const PIN = pathname.split('/')[2];
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch(`/api/room/get?PIN=${PIN}`);
                if(!response.ok) {
                    throw new Error("Failed to fetch players");
                }
                const data = await response.json();
                setPlayers(data.players);
            } catch(error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPlayers();
    }, []);

    const handleGameEnd = () => {
        
    }

    if(isLoading) return <></>

    console.log(players)
    return (
        <div className="h-screen overflow-auto">
            <div className="mt-16 mx-5">
                <h1 className="text-3xl font-bold text-center">Chips Remaining</h1>
                <div>
                    
                </div>
                <div className="py-10 mx-5">
                    <div className="flex justify-end items-end space-x-3 text-xl">
                        <button onClick={() => window.history.back()}>Cancel</button>
                        <button 
                            onClick={() => handleGameEnd}
                            className="font-bold"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EndTablePage