"use client"

import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TransferDropdown from "../TransferDropdown";
import { useSession } from "next-auth/react";

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
  totalBuyin: number;
  players: Player[];
  isModerator: boolean;
  isThisPlayerModerator: boolean;
  handleProfileClick: ({userId, email}: {userId: string, email: string}) => void;
}

const balanceColor = (buyin: number) => {
    if(buyin > 0)
        return "text-green-500";
    else if (buyin < 0) 
        return "text-red-500";
    else 
        return "opacity-50";
}

const PlayerCard: React.FC<PlayerStatProps> = ({
  roomId,
  user,
  totalBuyin,
  players,
  isModerator,
  isThisPlayerModerator,
  handleProfileClick,
}) => {
    const {data:session} = useSession();
    const [isDropDownActive, setIsDropDownActive] = useState(false);
    
    return (
        <>
          <div className={`mt-2 bg-black border border-transparent rounded-xl bg-opacity-20 grid grid-cols-[2fr_1fr] px-3 py-2 ${
            isDropDownActive ? "rounded-b-none " : "shadow-lg"
          }`}>
            <div className="text-md flex justify-start items-center gap-x-2">
              {/* User Info */}
              <div
                  onClick={() => {handleProfileClick({userId: user.userId, email: user!.email})}}
                  className="flex gap-4 justify-center items-center"
              >
                  <Image
                      src={user.image}
                      alt="user profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                  />
                  <div className={`${session?.user.id === user.userId ? "font-bold" : "opacity-75"}`}>
                    {user.name} 
                    <span className="ml-2">{isThisPlayerModerator && <>👑</>}</span>
                  </div>
              </div> 
            </div>

            <div className="flex justify-end">
              {/* Balance */}
              <div className={`flex justify-end items-center gap-2`}>
                  <div className={`${balanceColor(-totalBuyin)}`}>
                    {totalBuyin > 0 ? `-${totalBuyin}` : `+${-totalBuyin}`} 
                  </div>
              </div>
              {/* Dropdown Button */}
              {isModerator && (
                  <button
                      onClick={() => setIsDropDownActive(!isDropDownActive)}
                      className="pl-3 rounded-md opacity-50"
                  >
                      {isDropDownActive ? <ChevronUp /> : <ChevronDown />}
                  </button>
              )}
            </div>
            
            
          </div>
          
          {/* Dropdown */}
          {isDropDownActive && (
            <TransferDropdown
                roomId={roomId}
                user={user}
                players={players}
            />
          )}
        </>
    );
};

export default PlayerCard;
