"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronsRight } from "lucide-react";
import FormattedDate from "@/components/FormattedDate";

interface PlayerStatProps {
  sellerId: string;
  buyerId: string;
  amount: number;
  timeStamp: Date;
  handleProfileClick: ({userId, email}: {userId: string, email: string}) => void;
}

interface User {
  email: string;
  name: string;
  image: string;
}

const TransactionCard: React.FC<PlayerStatProps> = ({
  sellerId,
  buyerId,
  amount,
  timeStamp,
  handleProfileClick,
}) => {
  const [isLoading ,setIsLoading] = useState(true);
  const [seller, setSeller] = useState<User | null>(null);
  const [buyer, setBuyer] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [sellerDB, buyerDB] = await Promise.all([
          fetch(`/api/users/id?id=${sellerId}`).then(res => res.json()),
          fetch(`/api/users/id?id=${buyerId}`).then(res => res.json()),
        ]);

        console.log(sellerDB, buyerDB)

        setSeller({
          email: sellerDB.user.email,
          name: sellerDB.user.username,
          image: sellerDB.user.image,
        });
        setBuyer({
          email: buyerDB.user.email,
          name: buyerDB.user.username,
          image: buyerDB.user.image,
        });
      } catch(error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if(isLoading) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-y-3 bg-black  border border-transparent rounded-xl bg-opacity-20 shadow-lg px-3 py-3">
      <div className="grid grid-cols-3">
        <div 
          onClick={() => {handleProfileClick({userId: sellerId, email: seller!.email})}}
          className="flex items-center gap-x-4"
        >
          <Image
            src={seller!.image}
            alt="user profile"
            width={25}
            height={25}
            className="rounded-full"
          />
          <div>{seller?.name}</div>
        </div>
        <div className="flex justify-center opacity-50">
          <ChevronsRight />
        </div>
        <div 
          onClick={() => {handleProfileClick({userId: buyerId, email: buyer!.email})}}
          className="flex items-center justify-end gap-x-4"
        >
          <div>{buyer?.name}</div>
          <Image
            src={buyer!.image}
            alt="user profile"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm opacity-50">
        <div>
          <FormattedDate timeStamp={timeStamp}/>
        </div>
        <div className="flex justify-end">{amount} CHIPS</div>
      </div>
    </div>
  );
};

export default TransactionCard;
