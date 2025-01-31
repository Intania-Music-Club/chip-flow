
import { useRouter } from "next/navigation";
import { RoomReference } from "next-auth";
import Image from "next/image";


  
interface ProfileProps {
    name: string;
    image: string;
    roomJoined: RoomReference[];
    isOwnProfile: boolean;
}
  

const Profile: React.FC<ProfileProps> = ({ name, image, roomJoined, isOwnProfile }) => {
    const router = useRouter();
    const handleGoBackClicked = () => {
        window.history.back();
    }

    const handleNameClicked = () => {

    }
  
    return (
    <div className="flex flex-col">
        <nav className="m-6 text-3xl font-bold" onClick={handleGoBackClicked}>
            <div>{`<`}</div>
        </nav>
        <div className="mt-5 flex flex-col items-center">
            <section className="relative w-80 h-52 bg-white flex flex-col justify-center items-center text-black rounded-2xl">
                <div  className="absolute top-[-50px] flex flex-col items-center">
                    <Image 
                        src={image}
                        alt="userImg"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white"
                    />
                    <div className="mt-3 text-lg font-bold" onClick={handleNameClicked}>
                        <div>{name}</div>
                    </div>
                </div>
                
            </section>
        </div>
    </div>
  )
}

export default Profile