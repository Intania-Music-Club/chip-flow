"use client"

import { ArrowLeftRight } from "lucide-react"
import React, { useState, useRef } from "react"

interface Player {
    userId: string,
    image: string,
    name: string,
    email: string,
    remainingChips: number,
    totalBuyin: number,
}

interface Dropdown {
    roomId: string,
    user: Player;
    players: Player[];
}

const Dropdown: React.FC<Dropdown> = ({
    roomId, user, players,
}) => {
    const [amount, SetAmount] = useState<number | ''>('');
    const selectRef = useRef<HTMLSelectElement>(null);
    const handleTransferPlayerChange = () => {
        setPlayerToTransfer(selectRef.current?.value);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            if (value !== '') {
                const numberValue = Number(value);
                SetAmount(numberValue > user.totalBuyin ? user.totalBuyin : numberValue);
            } else {
                SetAmount('');
            }
        }
    }

    const [playerToTransfer, setPlayerToTransfer] = useState<string | undefined>(undefined)
    
      const handleTransfer = async () => {
        if(amount === 0 || playerToTransfer === "--") return;
        try {
          const response = await fetch("/api/room/new-transaction", {
            method: 'POST',
            body: JSON.stringify({
              roomId: roomId,
              seller: user.userId,
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
    
    return (
        <div className="pt-1 pb-3 flex gap-5 bg-black bg-opacity-20 justify-center items-center rounded-b-3xl text-sm">
            <select
                ref={selectRef}
                onChange={handleTransferPlayerChange}
                defaultValue="--"
                className="w-24 bg-transparent border rounded-md px-4 appearance-none text-center"
            >
                <option value="--" disabled>--</option>
                {players
                    .filter(player => player.name !== user.name)
                    .map(({userId, name}, idx) => (
                    <option key={idx} value={userId}>to {name}</option>
                ))}
            </select>

            :

            <input 
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={handleAmountChange}
                className="w-16 bg-transparent placeholder-gray-500 text-center border rounded-md"
            />

            <div className="ml-2" onClick={handleTransfer}>
            <ArrowLeftRight size={20}/>
            </div>
        </div>
    )
    }

export default Dropdown