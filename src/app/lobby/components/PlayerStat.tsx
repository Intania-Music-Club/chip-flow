import Image from "next/image";
import { useState } from "react";
import TransferModal from "./TransferModal";

interface PlayerStatProps {
  imgUrl: string;
  username: string;
  balance: number;
}

const PlayerStat: React.FC<PlayerStatProps> = ({
  imgUrl,
  username,
  balance,
}) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const openTransferModal = () => setIsTransferModalOpen(true);
  const closeTransferModal = () => setIsTransferModalOpen(false);
  const balanceColor =
    balance > 0
      ? "text-green-500"
      : balance < 0
      ? "text-red-500"
      : "text-white";
  const formattedBalance = balance > 0 ? `+${balance}` : balance.toString();
  return (
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
        <button
          onClick={openTransferModal}
          className="bg-blue-500 px-2 rounded-md font-normal text-sm py-1"
        >
          Transfer to
        </button>
      </div>
      <div className={`flex justify-end items-center ${balanceColor}`}>
        {formattedBalance}
      </div>

      {/* modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={closeTransferModal}
      />
    </div>
  );
};

export default PlayerStat;
