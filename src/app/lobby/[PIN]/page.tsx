"use client"

import { useEffect, useState } from 'react';
import Lobby from '../components/Lobby';
import { useParams } from 'next/navigation';

interface Player {
    userId: string,
    image: string,
    name: string,
    remainingChips: number,
    totalBuyin: number,
  }

interface Room {
    roomId: string;
    roomPIN: string | string[] | undefined;
    moderatorId: string,
    moderatorName: string;
    moderatorImg: string;
    multiplierFactor: number;
    players: Player[];
    transactions: [];

}

const LobbyPage = () => {
    const {PIN} = useParams();
    const [isLoading, setIsloading] = useState(true);
    const [roomFetched, setIsRoomFetched] = useState(false);
    const [room, setRoom] = useState<Room | undefined>(undefined);

    useEffect(() => {
        try {
            const fetchRoom = async () => {
                const response = await fetch(`/api/room/get/${PIN}`, {
                    method: "GET",
                });
    
                if(!response.ok) {
                    throw new Error(`Failed to Joined Room PIN: ${PIN}`);
                }
    
                const data = await response.json();
                // console.log(data);
                setRoom({
                    roomId: data.roomId,
                    roomPIN: data.roomPIN,
                    moderatorId: data.moderatorId,
                    moderatorName: data.moderatorName,
                    moderatorImg: data.moderatorImg,
                    multiplierFactor: data.multiplierFactor,
                    players: data.players,
                    transactions: data.transactions,
                });
                setIsRoomFetched(true);
                // console.log(room);
            }
            fetchRoom();
        } catch(error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if(roomFetched && room) {
            console.log(room);
            setIsloading(false);
        }
    }, [roomFetched])
    return (
        !isLoading && room &&
        <Lobby 
            roomId={room.roomId}
            roomPIN={Number(room.roomPIN)}
            moderatorId={room.moderatorId}
            moderatorName={room.moderatorName}
            moderatorImg={room.moderatorImg}
            multiplierFactor={room.multiplierFactor}
            players={room.players}
            transactions={room.transactions}
        />
    )
}

export default LobbyPage