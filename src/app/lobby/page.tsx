"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import BuyInModal from "./components/BuyInModal";
import PlayerStat from "./components/PlayerStat";
import Transaction from "./components/Transaction";

const LobbyPage = () => {
  const { data: session } = useSession();
  const userImg = session?.user?.image ?? "/";

  const [isBuyInModalOpen, setIsBuyInModalOpen] = useState(false);
  const openBuyInModal = () => setIsBuyInModalOpen(true);
  const closeBuyInModal = () => setIsBuyInModalOpen(false);
  return (
    <>
      <div className="mx-5 mt-14 flex flex-col gap-y-5 pb-32">
        <div className="grid grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-start font-bold">
            <div className="text-1xl">Game PIN</div>
            <div className="text-4xl">432 324</div>
          </div>
          <div className="flex justify-end items-start">
            <div className="bg-[#C63C51] px-2 py-3 font-bold text-md rounded-lg">
              END GAME
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex justify-start items-center">
            <div className="mr-2 font-light text-sm">Moderator</div>
            <Image
              src={userImg}
              alt="user profile"
              width={25}
              height={25}
              className="rounded-full mr-1"
            />
            <div className="font-bold">DannyChu</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <div className="font-light text-sm">Active Chips</div>
              <div className="font-bold">10000</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-light text-sm">Multiplier Factor</div>
              <div className="font-bold">1 Chip = 0.5</div>
            </div>
          </div>
        </div>

        <div>
          <div>Player Stats</div>
          <hr />
          <div className="mt-2">
            <div className="flex flex-col gap-y-1">
              <PlayerStat imgUrl={userImg} username="DannyChu" balance={2000} />
              <PlayerStat imgUrl={userImg} username="DannyChu" balance={0} />
              <PlayerStat imgUrl={userImg} username="DannyChu" balance={-200} />
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
          <div className="text-lg font-bold flex justify-start items-center gap-x-2">
            <Image
              src={userImg}
              alt="user profile"
              width={44}
              height={44}
              className="rounded-full"
            />
            DannyChu
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

export default LobbyPage;
