"use client"

import { ChevronLeft } from "lucide-react"
import { useSession } from "next-auth/react";
import { useState } from "react";


const BackButton = ({size} :{size: number}) => {
    const { update } = useSession();
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const handleGoBackClicked = async () => {
        setIsButtonPressed(true);
        await update();
        window.history.back();
    }
    return (
        <button 
            onClick={handleGoBackClicked}
            disabled={isButtonPressed}
            className="flex justify-start items-center font-bold hover:cursor-pointer -translate-x-2" 
        >
            <ChevronLeft size={size}/>
        </button>
    )
}

export default BackButton