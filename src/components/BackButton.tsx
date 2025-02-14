import { ChevronLeft } from "lucide-react"


const BackButton = ({size} :{size: number}) => {
    const handleGoBackClicked = () => {
        window.history.back();
    }
    return (
        <nav className="flex justify-start items-center font-bold hover:cursor-pointer -translate-x-2" onClick={handleGoBackClicked}>
            <ChevronLeft size={size}/>
        </nav>
    )
}

export default BackButton