import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign, FaS } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

function Balance() {
  const [balance, setBalance] = useState("0");
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await axios.get("https://paymentapp-sqmb.onrender.com/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).catch(() => {
        navigate("/")
      })
      setBalance(Math.round(response.data.balance));
    })()
  }, [refresh])
  return (
    <div className="w-full flex flex-col justify-center mt-10 p-5 rounded-md border-t-2 shadow-2xl">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold font-mono text-slate-200">Your Balance</p>
        <button onClick={() => {
            setRefresh(refresh => !refresh)
        }}><LuRefreshCcw className="text-slate-200"/></button>
      </div>
      <div className="flex mt-2 items-center">
        <FaIndianRupeeSign className="text-slate-100 text-2xl mt-1 mr -2" />
        <p className="text-slate-100 text-3xl">{String(balance).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
      </div>

    </div>
  )
}

export default Balance