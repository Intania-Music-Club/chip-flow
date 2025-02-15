"use client"

import React, { useEffect, useState } from 'react';
import Lobby from '../components/Lobby';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';

interface Player {
    userId: string;
    image: string;
    name: string;
    email: string;
    remainingChips: number;
    totalBuyin: number;
}

interface Transaction {
    transactionId: string;
    sellerId: string;
    buyerId: string;
    amount: number;
    timeStamp: Date;
}

interface Buyin {
    userId: string;
    amount: number;
    timeStamp: Date;
}

interface Room {
    roomId: string;
    roomPIN: string | string[] | undefined;
    moderatorId: string,
    moderatorName: string;
    moderatorImg: string;
    moderatorEmail: string;
    multiplierFactor: number;
    players: Player[];
    transactions: Transaction[];
    buyins: Buyin[];

}

const LobbyPage = () => {
    const { PIN } = useParams();
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch(`/api/room/get?PIN=${PIN}`, {
                    method: "GET",
                });
    
                if(!response.ok) {
                    throw new Error(`Failed to Joined Room PIN: ${PIN}`);
                }
    
                const data = await response.json();
                // console.log(data)
                setRoom(data);
            } catch(error) {
                console.log(error);
            }
        };
        
        fetchRoom();
    }, [PIN, trigger]);

    if(!room) return <Loading />;
    
    return (
        <Lobby 
            roomId={room.roomId}
            roomPIN={Number(room.roomPIN)}
            moderator={{
                id: room.moderatorId,
                name: room.moderatorName,
                image: room.moderatorImg,
                email: room.moderatorEmail
            }}
            multiplierFactor={room.multiplierFactor}
            players={room.players}
            transactions={room.transactions}
            trigger={trigger}
            setTrigger={setTrigger}
            buyins={room.buyins}
        />
    )
}

export default LobbyPage