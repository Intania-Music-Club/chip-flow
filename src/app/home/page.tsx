"use client"

import CreateModal from "@/components/CreateModal";
import JoinModal from "@/components/JoinModal";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const userImg = session?.user?.image ?? "/";

  return (
    <div className="pt-20 mx-5 h-screen">
      <div className="grid grid-cols-[2fr_1fr]">
        <div className="flex flex-col justify-start">
          <div className="font-bold text-xl">Hi,</div>
          <div className="font-bold text-3xl">{session?.user?.name}</div>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-bold bg-[#C63C51] mt-3 w-24 rounded-md text-sm text-center py-1"
          >
            Log Out
          </button>
        </div>

        <div className="flex justify-end items-start">
          <Image
            src={userImg}
            alt="user profile"
            width={70}
            height={70}
            className="mt-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-20 h-60 font-bold text-3xl">
        <button
          onClick={openJoinModal}
          className="flex flex-col items-center gap-y-5 justify-center mr-2 bg-[#C63C51] rounded-2xl"
        >
          <div className="h-24 w-24 rounded-full bg-[#A13142]" />
          <p>JOIN</p>
        </button>
        <button
          onClick={openCreateModal}
          className="flex flex-col items-center gap-y-5 justify-center mr-2 bg-[#D95F59] rounded-2xl"
        >
          <div className="h-24 w-24 rounded-2xl bg-[#BB504B]" />
          <p>CREATE</p>
        </button>
      </div>

      {/* Modal Component */}
      <JoinModal isOpen={isJoinModalOpen} onClose={closeJoinModal} />
      <CreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </div>
  );
};

export default HomePage