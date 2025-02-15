"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BackButton from "@/components/BackButton";
import AnimateNumber from "@/components/AnimatedNumber";

import Footer from "./Footer";
import BuyInModal from "./BuyInModal";
import TransactionCard from "./card/TransactionCard";
import PlayerCard from "./card/PlayerCard";
import BuyinCard from "./card/BuyinCard";

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

interface Buyin {
  userId: string;
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
  buyins: Buyin[];
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
  buyins,
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
    } catch(error) {
        console.log(error);
        alert("Buy-in failed, try again.");
    } finally {
      setTrigger(trigger % 2 ? 0:1);
      setBuyinAmount("");
    }
  }

  const router = useRouter();
  const handleProfileClick = ({userId, email} : {userId: string, email: string}) => {
    if (session?.user.id === userId)
        router.push("/profile")
    else
        router.push(`/profile/${email.split('@')[0].split('%40')[0]}`)
  }
  
  // console.log(buyins);
  return (
    <>
      <div className="mx-5 mt-5 flex flex-col gap-y-2 pb-32">
        {/* Back Button */}
        <div className="flex">
          <BackButton size={45}/>
        </div>

        {/* Header */}
        <header className="mt-3 grid grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-start font-bold">
            <div className="text-xl opacity-50">Room PIN</div>
            <div className="mt-1 text-4xl">{formatPIN(roomPIN)}</div>
          </div>
          {session?.user.id === moderator.id && (<div className="flex justify-center items-center">
            <div className="text-center w-28 bg-[#C63C51] mt-3 px-2 py-2 font-bold text-sm rounded-lg">
                END GAME
            </div>
          </div>)}
        </header>

        
        {/* Room Detail */}
        <div className="flex flex-col">
          <div className="flex flex-col justify-start items-start text-lg">
            <div className="">Moderator</div>
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
          <div className="mt-6 grid grid-cols-2 opacity-50">
            <div className="flex flex-col">
              <div className="text-sm">Active Chips</div>
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
              <div className="text-sm">Multiplier Factor</div>
              <div className="text-lg">1 CHIP = 1 / {1 / multiplierFactor}</div>
            </div>
          </div>
        </div>

        {/* Players */}
        <div className="mt-8">
          <div>Players <span className="opacity-50">{`(${players.length})`}</span></div>
          <hr />
          <div className="mt-3">
            <div className="flex flex-col">
              {sortedPlayers.map((user, idx) => (
                <PlayerCard
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
        <div className="mt-5">
          <div>Transactions <span className="opacity-50">{`(${0})`}</span></div>
          <hr />
          <div className="mt-3">
            <div className="flex flex-col gap-y-2">
              <TransactionCard
                senderName={"danny"}
                senderImgUrl={userImg}
                receiverName={"danny"}
                recieverImgUrl={userImg}
                amount={1000}
              />
              <TransactionCard
                senderName={"danny"}
                senderImgUrl={userImg}
                receiverName={"danny"}
                recieverImgUrl={userImg}
                amount={1000}
              />
            </div>
          </div>
        </div>

        {/* Buyins */}
        <div className="mt-5">
        <div>Buy-Ins <span className="opacity-50">{`(${buyins.length})`}</span></div>
          <hr />
          <div className="mt-3">
            <div className="flex flex-col gap-y-2">
              {buyins.slice().reverse().map(({userId, amount, timeStamp}, idx) => (
                <BuyinCard 
                  key={idx}
                  userId={userId}
                  amount={amount}
                  timeStamp={timeStamp}
                  handleProfileClick={handleProfileClick}
                />
              ))}
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
