import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import CloseIcon from "../../../../public/images/close-icon.svg";

interface ModalProps {
  isOpen: boolean;
  buyinAmount: string;
  setBuyinAmount: Dispatch<SetStateAction<string>>;
  handleBuyin: () => void;
  onClose: () => void;
}

const BuyInModal: FC<ModalProps> = ({ isOpen, buyinAmount, setBuyinAmount, handleBuyin, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-t from-black to-transparent"
      onClick={onClose} // คลิกที่พื้นหลังปิด Modal
    >
      <div
        className="bg-[#303030] fixed bottom-0 w-full h-3/4 rounded-t-[40px] px-5"
        onClick={(e) => e.stopPropagation()} // หยุดการปิดเมื่อคลิกใน Modal
      >
        <div className=" mt-7 h-10 flex items-center justify-between w-full">
          <div className="text-3xl font-bold absolute left-0 right-0 text-center">
            Buy In
          </div>
          <button
            onClick={onClose}
            className="bg-[#434343] h-10 w-10 rounded-full absolute right-6"
          >
            <Image src={CloseIcon} alt="close" />
          </button>
        </div>

        <input
          type="number"
          placeholder="CHIPS"
          inputMode="numeric"
          value={buyinAmount}
          onChange={(e) => setBuyinAmount(e.target.value)}
          autoFocus
          className=" placeholder-[#9D9D9D] caret-[#9D9D9D] text-white text-6xl mt-10 font-bold bg-transparent text-center w-full outline-none ring-0"
        ></input>

        <button 
          onClick={() => {handleBuyin(); onClose();}}
          className="bg-[#85A947] text-white text-3xl font-bold w-full h-14 rounded-lg mt-8">
          BUY
        </button>
      </div>
    </div>
  );
};

export default BuyInModal;
