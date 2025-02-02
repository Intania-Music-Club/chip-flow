"use client"

import CreateModal from "@/components/CreateModal";
import JoinModal from "@/components/JoinModal";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { data: session, status } = useSession();
  console.log(session);

  const [logOutText, setLogOutText] = useState("Log Out");
  const handleSignOut = () => {
    setLogOutText("Log Out ...");
    signOut({ callbackUrl: "/" });
  };

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isLogOutVisble, setIsLogOutVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    if(status === "authenticated") {
        const timer = setTimeout(() => {
            setIsButtonVisible(true);
        }, 100)
        return () => {
            if(timer) clearTimeout(timer)
        }
    }
  }, [status])

  useEffect(() => {
    if(isButtonVisible) {
        const timer = setTimeout(() => {
            setIsNameVisible(true);
        }, 300)
        return () => {
            if(timer) clearTimeout(timer)
        }
    }
  }, [isButtonVisible])

  useEffect(() => {
    if(isNameVisible) {
        const timer = setTimeout(() => {
            setIsImageVisible(true);
        }, 200)
        return () => {
            if(timer) clearTimeout(timer)
        }
    }
  }, [isNameVisible])

  useEffect(() => {
    if(isImageVisible) {
        const timer = setTimeout(() => {
            setIsLogOutVisible(true);
        }, 300)
        return () => {
            if(timer) clearTimeout(timer)
        }
    }
  }, [isImageVisible])

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const userImg = session?.user?.image ?? "/";

  return (
    <div className="pt-20 mx-5 h-screen overflow-x-hidden">
      <div className="grid grid-cols-[2fr_1fr] mx-2">
        <div className="flex flex-col justify-start">
            <div className={`font-bold text-xl transition-all duration-700 ${isNameVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
                Hi,
            </div>
            <div className={`font-bold text-3xl transtion-all duration-500 ${isNameVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
                {session?.user.name}
            </div>
            <button
                type="button"
                onClick={handleSignOut}
                className={`text-bold bg-[#C63C51] mt-3 w-24 rounded-md text-sm text-center py-1 transition-all duration-500 hover:scale-110 ${
                    isLogOutVisble ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
                {logOutText}
            </button>
        </div>

        <div className={`flex justify-end items-start transition-all duration-500 ${isImageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <Link href="/profile">
            <Image
                src={userImg}
                alt="user profile"
                width={70}
                height={70}
                className="mt-3 rounded-full transition-all duration-150 hover:scale-110"
            />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-20 h-60 font-bold text-3xl">
        <div className={`flex flex-col justify-center mr-2 bg-[#C63C51] rounded-2xl transition-all duration-700 hover:scale-105 ${
            isButtonVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
        }`}>
            <button
                onClick={openJoinModal}
                className="flex flex-col items-center gap-y-5"
            >
                <div className="h-24 w-24 rounded-full bg-[#A13142]" />
                <p>JOIN</p>
            </button>
        </div>
        <div className={`flex flex-col justify-center ml-2 bg-[#D95F59] rounded-2xl transition-all duration-700 hover:scale-105 ${
            isButtonVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        }`}>
            <button
                onClick={openCreateModal}
                className="flex flex-col items-center gap-y-5"
            >
                <div className="h-24 w-24 rounded-2xl bg-[#BB504B]" />
                <p>CREATE</p>
            </button>
        </div>
      </div>

      {/* Modal Component */}
      <JoinModal isOpen={isJoinModalOpen} onClose={closeJoinModal} />
      <CreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </div>
  );
};

export default HomePage