
import { useRouter } from "next/navigation";
import { RoomReference } from "next-auth";
import Image from "next/image";


  
interface ProfileProps {
    name: string;
    image: string;
    roomJoined: RoomReference[];
    bankroll: number;
    isOwnProfile: boolean;
}
  

const Profile: React.FC<ProfileProps> = ({ name, image, roomJoined, bankroll, isOwnProfile }) => {
    const router = useRouter();
    const handleGoBackClicked = () => {
        window.history.back();
    }

    const handleNameClicked = () => {

    }
  
    return (
    <div className="flex flex-col mx-6">
        <nav className="mt-6 mb-20 text-3xl font-bold" onClick={handleGoBackClicked}>
            <div>{`<`}</div>
        </nav>
        <div className="pt-5 flex flex-col items-center">
            <section className="relative w-[360px] h-[215px] bg-white flex flex-col justify-center items-center text-black rounded-2xl">
                <div  className="absolute top-[-60px] flex flex-col items-center">
                    <Image 
                        src={image}
                        alt="userImg"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white"
                    />
                    <div className="mt-3 text-xl font-bold" onClick={handleNameClicked}>
                        <div>{name}</div>
                    </div>
                    <div className="mt-2 w-full flex justify-evenly">
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-3xl font-bold">
                                {roomJoined.length}
                            </div>
                            <div className="mt-1 flex flex-col justify-center items-center leading-[1.1] text-gray-600 font-light">
                                <div>Match</div>
                                <div>Played</div>
                            </div>
                        </div>
                        <div className="w-20 flex flex-col justify-center items-center">
                            <div className="text-3xl font-bold">
                                {bankroll}
                            </div>
                            <div className="mt-1 flex flex-col justify-center items-center leading-[1.1] text-gray-600 font-light">
                                <div>All-time</div>
                                <div>Earned</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
        <section className="mt-10 p-1 border-b-1">
            <div className="text-xl">Last 10 Matches</div>
        </section>
        <section className="mt-10 p-1 border-b-1">
            <div className="text-xl">Match History</div>
        </section>
    </div>
  )
}

export default Profile