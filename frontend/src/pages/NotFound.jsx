import { useState } from "react"
import Footer from "../components/global/Footer"
import NavBar from "../components/NavBar"
import Info from "../components/global/Info"
import { IoIosInformationCircle } from "react-icons/io";


function NotFound() {
    const [errorCode, setErrorCode] = useState(400)
    return (
        <div className="h-screen flex flex-col justify-between ">
            <div className="h-full flex justify-center items-center bg-black">
                {
                    errorCode == 404 ? <p className="text-7xl font-mono font-extrabold text-red-400">404 - Not Found</p>
                        : <p className="text-7xl font-mono font-extrabold text-red-400">500 - Internal Server Error</p>
                }
            </div>
            <Info message={"Hi there"} className={"bg-slate-700 text-cyan-100"}>
                <IoIosInformationCircle />
            </Info>
            <Footer />
        </div>
    )
}

export default NotFound