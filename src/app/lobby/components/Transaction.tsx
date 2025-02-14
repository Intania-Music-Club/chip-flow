import Image from "next/image";

interface PlayerStatProps {
  senderImgUrl: string;
  senderName: string;
  recieverImgUrl: string;
  receiverName: string;
  amount: number;
}

const Transaction: React.FC<PlayerStatProps> = ({
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
        <div className="text-center gap-x-2 font-light text-sm flex justify-center items-center">
          transfer to
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
      <div className="grid grid-cols-2 text-sm">
        <div>Amount: {amount}</div>
        <div className="flex justify-end text-gray-400">01/03/25 18:00</div>
      </div>
    </div>
  );
};

export default Transaction;
