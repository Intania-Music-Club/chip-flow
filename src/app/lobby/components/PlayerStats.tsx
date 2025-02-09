"use client"

import Image from "next/image";
import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ArrowLeftRight } from "lucide-react";
import { useSession } from "next-auth/react";

interface Player {
  userId: string,
  image: string,
  name: string,
  remainingChips: number,
  totalBuyin: number,
}

interface PlayerStatProps {
  roomId: string,
  imgUrl: string,
  username: string,
  userId: string,
  remainingChips: number,
  balance: number,
  players: Player[],
  isModerator: boolean,
}

const PlayerStats: React.FC<PlayerStatProps> = ({
  roomId,
  imgUrl,
  username,
  userId,
  remainingChips,
  balance,
  players,
  isModerator,
}) => {
  const {data:session} = useSession();
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [playerToTransfer, setPlayerToTransfer] = useState<string | undefined>(undefined)
  const [amount, SetAmount] = useState<number>(0);

  const selectRef = useRef<HTMLSelectElement>(null);
  const handleTransferPlayerChange = () => {
    setPlayerToTransfer(selectRef.current?.value);
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || /^\d+$/.test(value)) {
      // If the value is not empty and is a number, make sure it doesn't exceed remainingChips
      if (value !== '') {
        const numberValue = Number(value);
        SetAmount(numberValue > remainingChips ? remainingChips : numberValue);
      } else {
        SetAmount(0);
      }
    }
  }

  const handleTransfer = async () => {
    if(amount === 0 || playerToTransfer === "--") return;
    try {
      const response = await fetch("/api/room/new-transaction", {
        method: 'POST',
        body: JSON.stringify({
          roomId: roomId,
          seller: userId,
          buyer: playerToTransfer,
          amount: amount,
        })
      });

      if(!response.ok) {
        throw new Error("Failed to POST new-transaction");
      }
    } catch(error) {
      console.log(error);
    }
  }

  const balanceColor =
    balance > 0
      ? "text-green-500"
      : balance < 0
      ? "text-red-500"
      : "text-gray-400";

  const formattedBalance = balance > 0 ? `+${balance}` : balance.toString();
  return (
    <div className="">
      <div className="bg-black bg-opacity-20 text-white grid grid-cols-[3fr_1fr] px-3 py-2">
        <div className="text-md font-bold flex justify-start items-center gap-x-2">
          <Image
            src={imgUrl}
            alt="user profile"
            width={30}
            height={30}
            className="rounded-full"
          />
          {username}
          {isModerator && (
              <button
              onClick={() => setIsDropDownActive(!isDropDownActive)}
              className="px-2 rounded-md opacity-50"
              >
                  <ChevronDown />
              </button>
          )}
        </div>
        <div className={`flex justify-end items-center ${balanceColor}`}>
          {formattedBalance}
        </div>
      </div>
      {isDropDownActive && (
        <div className="mx-3 pt-1 pb-3 flex gap-5 justify-center items-center border border-t-0 rounded-b-lg text-sm">
          <select
            ref={selectRef}
            onChange={handleTransferPlayerChange}
            defaultValue="--"
            className="bg-transparent border rounded-md px-4 appearance-none text-center"
          >
            <option value="--" disabled>--</option>
            {
            players
              .filter(player => player.name !== username)
              .map(({userId, name}, idx) => (
                <option key={idx} value={userId}>to {name}</option>
            ))}
          </select>
          :
          <input 
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-16 bg-transparent placeholder-gray-500 text-center border rounded-md"
          />

          <div className="ml-2" onClick={handleTransfer}>
            <ArrowLeftRight size={20}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
