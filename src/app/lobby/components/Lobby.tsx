"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BuyInModal from "./BuyInModal";
import PlayerStats from "./PlayerStats";
import Transaction from "./Transaction";

interface Player {
  userId: string,
  image: string,
  name: string,
  remainingChips: number,
  totalBuyin: number,
}

interface Transaction {
  transactionId: string,
  seller: {
    id: string,
    name: string,
  },
  buyer: {
    id: string,
    name: string,
  },
  amount: number,
  timeStamp: Date
}

interface RoomProps {
  roomId: string,
  roomPIN: number,
  moderatorId: string,
  moderatorName: string,
  moderatorImg: string,
  multiplierFactor: number,
  players: Player[],
  transactions: Transaction[],
}


const Lobby: React.FC<RoomProps> = ({
  roomId,
  roomPIN, 
  moderatorId,
  moderatorName, 
  moderatorImg, 
  multiplierFactor,
  players,
  transactions,
}) => {
  const { data: session } = useSession();
  const userImg = session?.user?.image ?? "/";
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [activeChips, setActiveChips] = useState(0);

  const [isBuyInModalOpen, setIsBuyInModalOpen] = useState(false);
  const openBuyInModal = () => setIsBuyInModalOpen(true);
  const closeBuyInModal = () => setIsBuyInModalOpen(false);

  const formatPIN = (number: number) => {
    return number.toString().replace(/(\d{3})(\d{3})/, '$1 $2');
  }

  useEffect(() => {
    const sortedResult = players.map(player => ({
      ...player,
    })).sort((a,b) => (b.remainingChips - b.totalBuyin) - (a.remainingChips - a.totalBuyin));

    setSortedPlayers(sortedResult);
  }, [players])

  useEffect(() => {
    const totalChip = players.reduce((sum, player) => sum + player.totalBuyin, 0);
    setActiveChips(totalChip);
  }, [players])
  return (
    <>
      <div className="mx-5 mt-14 flex flex-col gap-y-5 pb-32">
        <div className="grid grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-start font-bold">
            <div className="text-1xl text-gray-500">Room PIN</div>
            <div className="mt-1 text-4xl">{formatPIN(roomPIN)}</div>
          </div>
          <div className="flex justify-end items-start">
            <div className="bg-[#C63C51] mt-3 px-2 py-3 font-bold text-md rounded-lg">
              END GAME
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-t-5">
          <div className="flex justify-start text-lg items-center gap-2">
            <div className="mr-2 font-light">Moderator</div>
            <div className="font-bold">{moderatorName}</div>
            <Image
              src={moderatorImg}
              alt="user profile"
              width={25}
              height={25}
              className="rounded-full mx-1"
            />
          </div>
          <div className="mt-10 grid grid-cols-2">
            <div className="flex flex-col">
              <div className="font-light text-sm">Active Chips</div>
              <div className="font-bold">{activeChips} CHIPS</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-light text-sm">Multiplier Factor</div>
              <div className="font-bold">1 CHIP = {multiplierFactor}</div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div>Players <span className="text-gray-400">{`(${players.length})`}</span></div>
          <hr />
          <div className="mt-5">
            <div className="flex flex-col gap-y-1">
              {sortedPlayers.map(({userId, image, name, remainingChips, totalBuyin}, idx) => (
                <PlayerStats
                  key={idx} 
                  roomId={roomId}
                  imgUrl={image}
                  userId={userId}
                  username={name}
                  remainingChips={remainingChips}
                  balance={remainingChips-totalBuyin}
                  players={players}
                  isModerator={session?.user.id === moderatorId}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div>Transaction</div>
          <hr />
          <div className="mt-2">
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
      <footer className="bg-white text-black  h-24 fixed bottom-0 w-full px-5">
        <div className="grid grid-cols-[2fr_1fr] mt-3">
          <div className="text-lg font-bold flex justify-start items-center gap-x-4">
            <Image
              src={userImg}
              alt="user profile"
              width={44}
              height={44}
              className="rounded-full"
            />
            {session?.user.name}
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={openBuyInModal}
              className="bg-black text-white py-2 px-4 rounded-md text-lg font-bold"
            >
              Buy In
            </button>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <BuyInModal isOpen={isBuyInModalOpen} onClose={closeBuyInModal} />
    </>
  );
};

export default Lobby;
