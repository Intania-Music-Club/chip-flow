import Image from "next/image"
import { useSession } from "next-auth/react"
import React from "react";

interface Footer {
    openBuyInModal: () => void;
    handleProfileClick: () => void;
}

const Footer: React.FC<Footer> = ({
    openBuyInModal,
    handleProfileClick,
}) => {
    const { data:session } = useSession();

    return (
        <footer className="bg-black bg-opacity-40 backdrop-blur-md text-white h-24 fixed bottom-0 w-full px-5">
        <div className="grid grid-cols-[2fr_1fr] mt-3">
          <div 
            className="text-lg font-bold flex justify-start items-center gap-x-4"
            onClick={handleProfileClick}
          >
            <Image
              src={session?.user.image ?? "/"}
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
              className="bg-primary-red bg-opacity-80 text-white py-2 px-4 rounded-md text-lg font-bold"
            >
              Buy In
            </button>
          </div>
        </div>
      </footer>
    )
}

export default Footer