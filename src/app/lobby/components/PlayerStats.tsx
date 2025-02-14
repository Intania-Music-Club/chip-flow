"use client"

import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Dropdown from "./Dropdown";

interface Player {
  userId: string;
  image: string;
  name: string;
  email: string;
  remainingChips: number;
  totalBuyin: number;
}

interface PlayerStatProps {
  roomId: string;
  user: Player;
  balance: number;
  players: Player[];
  isModerator: boolean;
  handleProfileClick: () => void;
}

const balanceColor = (balance: number) => {
    if(balance > 0)
        return "text-green-500";
    else if (balance < 0) 
        return "text-red-500";
    else 
        return "text-gray-400";
}

const PlayerStats: React.FC<PlayerStatProps> = ({
  roomId,
  user,
  balance,
  players,
  isModerator,
  handleProfileClick,
}) => {
    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const formattedBalance = balance > 0 ? `+${balance}` : balance.toString();
    
    return (
        <>
          <div className="bg-black border border-transparent rounded-xl bg-opacity-20 text-white grid grid-cols-[3fr_1fr] px-3 py-2">
            <div className="text-md font-bold flex justify-start items-center gap-x-2">
              {/* User Info */}
              <div
                  onClick={handleProfileClick} 
                  className="flex gap-4 justify-center items-center"
              >
                  <Image
                      src={user.image}
                      alt="user profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                  />
                  {user.name}
              </div>

              {/* Dropdown Button */}
              {isModerator && (
                  <button
                      onClick={() => setIsDropDownActive(!isDropDownActive)}
                      className="px-2 rounded-md opacity-50"
                  >
                      {isDropDownActive ? <ChevronUp /> : <ChevronDown />}
                  </button>
              )} 
            </div>

            {/* Balance */}
            <div className={`flex justify-end items-center gap-2`}>
                <div className={`${balanceColor(balance)}`}>
                  {formattedBalance} 
                </div>
                <div className="text-gray-400">
                  ({user.totalBuyin})
                </div>
            </div>
          </div>
          
          {/* Dropdown */}
          {isDropDownActive && (
            <Dropdown 
                roomId={roomId}
                user={user}
                players={players}
            />
          )}
        </>
    );
};

export default PlayerStats;
