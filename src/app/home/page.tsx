"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import JoinModal from "@/app/home/components/JoinModal";
import CreateModal from "@/app/home/components/CreateModal";
import ActiveRoomCard from "@/app/home/components/ActiveRoomCard";

const HomePage = () => {
    const { data: session, status, update } = useSession();
    //   console.log(session);

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleSignOut = () => {
        setIsLoggingOut(true);
        signOut({ callbackUrl: "/" });
    };

    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isLogOutVisble, setIsLogOutVisible] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isActiveRoomVisible, setIsActiveRoomVisible] = useState(false);

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

    useEffect(() => {
        if(isNameVisible) {
            const timer = setTimeout(() => {
                setIsActiveRoomVisible(true);
            }, 300)
            return () => {
                if(timer) clearTimeout(timer)
            }
        }
    }, [isNameVisible])

    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const openJoinModal = () => setIsJoinModalOpen(true);
    const closeJoinModal = () => setIsJoinModalOpen(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    return (
        <div className="pt-20 mx-5 h-screen overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr] mx-2">
            {/* Header */}
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
                    className={`relative text-bold bg-[#C63C51] mt-3 flex w-32 justify-center items-center rounded-md text-sm py-1 transition-all duration-500 active:scale-95
                        ${isLogOutVisble ? "opacity-80 translate-x-0" : "opacity-0 -translate-x-8"}
                `}>
                    Log Out
                    <div className={`absolute right-2 transition-all duration-300 ${
                        isLoggingOut ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                    }`}>
                        <div className="w-4 h-4 border-4 border-gray-200 border-t-primary-red rounded-full animate-spin"></div>
                    </div>
                </button>
            </div>
            
            {/* Buttons */}
            <div className={`flex justify-end items-start transition-all duration-500 ${isImageVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                <Link href="/profile">
                    <Image
                        src={session?.user.image ?? "/"}
                        alt="user profile"
                        width={70}
                        height={70}
                        className="mt-3 rounded-full transition-all duration-150 hover:scale-110"
                        priority
                    />
                </Link>
            </div>
        </div>

        <div className="grid grid-cols-2 mt-20 h-60 font-bold text-3xl">
            <div className={`flex flex-col justify-center mr-2 bg-[#C63C51] rounded-2xl transition-all duration-700 hover:scale-95 ${
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
            <div className={`flex flex-col justify-center ml-2 bg-[#D95F59] rounded-2xl transition-all duration-700 hover:scale-95 ${
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
        
        {session?.user.roomPINJoining && (
            <div className="mt-12">
                <div className={`mb-2 text-2xl font-bold transition-all duration-1000 ${isActiveRoomVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}>
                    Let's Chippy!
                </div>
                <hr className={`transition-all duration-1000 ${isActiveRoomVisible ? "opacity-50" : "opacity-0"}`} />
                <div className="mt-5">
                    <ActiveRoomCard 
                        roomPIN={session.user.roomPINJoining}
                        isTitleVisible={isActiveRoomVisible}
                    />
                </div>
            </div>
        )}

        {/* Modal Component */}
            <JoinModal isOpen={isJoinModalOpen} onClose={closeJoinModal} />
            <CreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
        </div>
  );
};

export default HomePage