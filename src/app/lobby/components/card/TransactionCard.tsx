import Image from "next/image";
import { ChevronsLeft } from "lucide-react";

interface PlayerStatProps {
  senderImgUrl: string;
  senderName: string;
  recieverImgUrl: string;
  receiverName: string;
  amount: number;
}

const TransactionCard: React.FC<PlayerStatProps> = ({
  senderImgUrl,
  senderName,
  recieverImgUrl,
  receiverName,
  amount,
}) => {
  return (
    <div className="flex flex-col gap-y-3 bg-black  border border-transparent rounded-xl bg-opacity-20 px-3 py-3">
      <div className="grid grid-cols-3">
        <div className="flex items-center gap-x-2">
          <Image
            src={senderImgUrl}
            alt="user profile"
            width={25}
            height={25}
            className="rounded-full"
          />
          <div>{senderName}</div>
        </div>
        <div className="flex justify-center opacity-50">
          <ChevronsLeft />
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <div>{receiverName}</div>
          <Image
            src={recieverImgUrl}
            alt="user profile"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm opacity-50">
        <div>01/03/25 18:00</div>
        <div className="flex justify-end">{amount} CHIPS</div>
      </div>
    </div>
  );
};

export default TransactionCard;
