"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import PlayerStats from "./PlayerStats";
import Transaction from "./Transaction";
import Footer from "./Footer";
import BuyInModal from "./BuyInModal";
import AnimateNumber from "@/components/AnimatedNumber";

interface Player {
  userId: string;
  image: string;
  name: string;
  email: string;
  remainingChips: number;
  totalBuyin: number;
}

interface Moderator {
  id: string;
  name: string;
  image: string;
  email: string;
}

interface Transaction {
  transactionId: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  timeStamp: Date;
}

interface RoomProps {
  roomId: string;
  roomPIN: number;
  moderator: Moderator;
  multiplierFactor: number;
  players: Player[];
  transactions: Transaction[];
  trigger: number;
  setTrigger: Dispatch<SetStateAction<number>>
}


const Lobby: React.FC<RoomProps> = ({
  roomId,
  roomPIN, 
  moderator, 
  multiplierFactor,
  players,
  transactions,
  trigger,
  setTrigger,
}) => {
  const { data: session } = useSession();
  const userImg = session?.user?.image ?? "/";

  const [isBuyInModalOpen, setIsBuyInModalOpen] = useState(false);
  const openBuyInModal = () => setIsBuyInModalOpen(true);
  const closeBuyInModal = () => setIsBuyInModalOpen(false);

  const formatPIN = (number: number) => {
    return number.toString().replace(/(\d{3})(\d{3})/, '$1 $2');
  }


  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  useEffect(() => {
    const sortedResult = players.map(player => ({
      ...player,
    })).sort((a,b) => (b.remainingChips - b.totalBuyin) - (a.remainingChips - a.totalBuyin));

    setSortedPlayers(sortedResult);
  }, [players]);


  const [activeChips, setActiveChips] = useState(0);
  useEffect(() => {
    const totalChip = players.reduce((sum, player) => sum + player.totalBuyin, 0);
    setActiveChips(totalChip);
  }, [players]);


  const [buyinAmount, setBuyinAmount] = useState<string>('');
  const getPlayerById = (players: Player[] | undefined, userId: string | undefined): Player | undefined => {
    return players?.find(player => player.userId === userId);
  }
  const handleBuyin = async () => {
    try {
        const player = getPlayerById(players, session?.user.id);
        const response = await fetch(`/api/room/buyin`, {
            method: 'PATCH',
            body: JSON.stringify({
                buyinAmount: Number(buyinAmount),
                roomId: roomId,
                userId: player?.userId,
            })
        });
        if(!response.ok){
            throw new Error("Failed to buy chips");
        }
        setTrigger(trigger % 2 ? 0:1);

    } catch(error) {
        console.log(error);
        alert("Buy-in failed, try again.");
    }
  }

  const router = useRouter();
    const handleProfileClick = ({userId, email} : {userId: string, email: string}) => {
      if (session?.user.id === userId)
          router.push("/profile")
      else
          router.push(`/profile/${email.split('@')[0].split('%40')[0]}`)
    }

  return (
    <>
      <div className="mx-5 mt-5 flex flex-col gap-y-2 pb-32">
        <div className="flex">
          <BackButton size={45}/>
        </div>

        {/* Header */}
        <header className="mt-3 grid grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-start font-bold">
            <div className="text-xl text-gray-500">Room PIN</div>
            <div className="mt-1 text-4xl">{formatPIN(roomPIN)}</div>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-center w-28 bg-[#C63C51] mt-3 px-2 py-2 font-bold text-sm rounded-lg">
                END GAME
            </div>
          </div>
        </header>

        
        {/* Room Detail */}
        <div className="flex flex-col">
          <div className="flex flex-col justify-start items-start text-lg">
            <div className="text-gray-500">Moderator</div>
            <div
              onClick={() => handleProfileClick({
                userId: moderator.id,
                email: moderator.email,
              })} 
              className="flex justify-center items-center gap-2">
              <Image
                src={moderator.image}
                alt="user profile"
                width={25}
                height={25}
                className="rounded-full mx-1"
              />
              <div className="font-bold text-xl">{moderator.name}</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 text-gray-400">
            <div className="flex flex-col">
              <div className="font-light text-gray-400 text-sm">Active Chips</div>
              <div className="flex gap-2 text-lg">
              <AnimateNumber 
                from={0}
                to={activeChips}
                duration={1500}
              />
                CHIPS
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-light text-gray-400 text-sm">Multiplier Factor</div>
              <div className="text-lg">1 CHIP = 1 / {1 / multiplierFactor}</div>
            </div>
          </div>
        </div>

        {/* Players */}
        <div className="mt-8">
          <div>Players <span className="text-gray-400">{`(${players.length})`}</span></div>
          <hr />
          <div className="mt-3">
            <div className="flex flex-col gap-y-1">
              {sortedPlayers.map((user, idx) => (
                <PlayerStats
                    key={idx} 
                    roomId={roomId}
                    user={user}
                    balance={user.remainingChips-user.totalBuyin}
                    players={players}
                    isModerator={session?.user.id === moderator.id}
                    handleProfileClick={() => handleProfileClick({
                      userId: user.userId,
                      email: user.email,
                    })}
                />
              ))}
            </div>
          </div>
        </div>


        {/* Transactions */}
        <div className="mt-12">
          <div>Transactions</div>
          <hr />
          <div className="mt-3">
            <div className="flex flex-col gap-y-1">
              <Transaction
                senderName={"danny"}
                senderImgUrl={userImg}
                receiverName={"danny"}
                recieverImgUrl={userImg}
                amount={1000}
              />
              <Transaction
                senderName={"danny"}
                senderImgUrl={userImg}
                receiverName={"danny"}
                recieverImgUrl={userImg}
                amount={1000}
              />
              <Transaction
                senderName={"danny"}
                senderImgUrl={userImg}
                receiverName={"danny"}
                recieverImgUrl={userImg}
                amount={1000}
              />
              <Transaction
                senderName={"danny"}
                senderImgUrl={userImg}
                receiverName={"danny"}
                recieverImgUrl={userImg}
                amount={1000}
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer 
          openBuyInModal={openBuyInModal} 
          handleProfileClick={() => handleProfileClick({
            userId: session?.user.id ?? "",
            email: session?.user.email ?? "/"
          })}
      />

      {/* Modal */}
      <BuyInModal 
        isOpen={isBuyInModalOpen} 
        onClose={closeBuyInModal} 
        buyinAmount={buyinAmount}
        setBuyinAmount={setBuyinAmount}
        handleBuyin={handleBuyin}
      />
    </>
  );
};

export default Lobby;
