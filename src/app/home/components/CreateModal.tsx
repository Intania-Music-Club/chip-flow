import Image from "next/image";
import { FC, useState } from "react";
import CloseIcon from "../../../../public/images/close-icon.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const { data:session } = useSession();
  const router = useRouter();
  const [multiplierFactor, setMultiplierFactor] = useState<string>("");
  const [isValidMultiplerFactor, setIsValidMultiplierFactor] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValidMultiplierFactor(true);
      const value = parseInt(e.currentTarget.value);
      if (value > 10) {
        e.currentTarget.value = '10'; // Auto-correct values over 10
        setIsValidMultiplierFactor(false);
      } else if (value < 1 || isNaN(value)) {
        e.currentTarget.value = '';   // Clear if less than 1 or empty
        setIsValidMultiplierFactor(false);
      }
      setMultiplierFactor(e.currentTarget.value);
  };

  const handleCreateRoom = async () => {
    if(!multiplierFactor || multiplierFactor === "") {
      alert("Please enter a multipler factor");
    }

    try {
      const response = await fetch('/api/room/create', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          multiplierFactor: (1 / Number(multiplierFactor)),
        })
      });

      if(!response.ok) {
        throw new Error("Failed to create new room");
      }

      const data = await response.json();
      console.log(data);

      router.push(`/lobby/${data.PIN}`)
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`z-10 fixed inset-0 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose} // คลิกที่พื้นหลังปิด Modal
    >
      <div
        className={`bg-[#303030] fixed bottom-0 w-full h-3/4 rounded-t-[40px] px-5 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-100 translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // หยุดการปิดเมื่อคลิกใน Modal
      >
        <div className="mt-7 h-10 flex items-center justify-between w-full">
          <div className="text-3xl font-bold absolute left-0 right-0 text-center">
            Create Game
          </div>
          <button
            onClick={onClose}
            className="bg-[#434343] h-10 w-10 rounded-full absolute right-6"
          >
            <Image src={CloseIcon} alt="close" />
          </button>
        </div>
        <div className="w-full mt-10 flex justify-center items-center text-6xl font-bold text-center gap-4">
          <div className="text-end">1</div>
          <div>/</div>
          <input
            type="number"
            placeholder="M.F."
            inputMode="decimal"
            autoFocus
            value={multiplierFactor}
            onInput={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                e.preventDefault();  // Prevent typing 'e', 'E', '+', and '-'
              }
            }}
            className="w-32 text-center placeholder-[#9D9D9D] caret-[#9D9D9D] text-white bg-transparent outline-none ring-0"
          />
        </div>

        {!isValidMultiplerFactor && (
          <div className="mt-3 text-primary-red text-center">Please enter only positive integer not exceeding 10 </div>
        )}

        <button
          onClick={handleCreateRoom}
          className="bg-[#D95F59] text-white text-3xl font-bold w-full h-14 rounded-lg mt-8"
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
