import { useState } from "react"
import Button from "../components/global/Button"
import Heading from "../components/global/Heading"
import InputBox from "../components/global/InputBox"
import Profile from "../components/global/Profile"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from 'sonner'

function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <div className='z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] blur-sm bg-cover'></div>
      <div className="absolute top-0 w-screen h-screen flex justify-center items-center">
        <div className='rounded-md bg-transparent border-t-2 p-8 shadow-2xl'>
          <div className="">
            <Heading children={"Send Money"} />
          </div>
          <div className="mt-7 mb-5 flex flex-row items-center gap-4">
            <Profile className="bg-green-500" firstname={name} lastname={name} />
            <p className="text-xl text-slate-200 font-semibold font-mono">{name}</p>
          </div>
          <div>
            <InputBox label={"Amount (in Rs)"} placeholder={"Enter amount"} onChange={(e) => {
              setAmount(parseInt(e.target.value))
            }} />
          </div>
          <div className="w-full flex flex-col mt-5">
            <Button className="bg-green-500" children={"Initiate Transfer"} onClick={async () => {
              toast.promise(axios.post("http://localhost:3000/api/v1/account/transfer", {
                recipientId: id,
                amount: amount
              },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                  }
                }),
                {
                  loading: "Transferring Money",
                  success: response => {
                    navigate("/dashboard")
                    return "Transfer Successfull"
                  },
                  error: error => {
                    if(error.response) {
                      if(error.response.status == 411){
                        return 'Incorrect Input'
                      } else if(error.response.status == 404){
                        return "Sender / Receiver's account is not found"
                      } else if(error.response.status == 403){
                        return "Insufficient Balance."
                      } else {
                        return 'Something went wrong.'
                      }
                    } else {
                      return 'Internal Server Error'
                    }
                  }
                }
              )
            }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SendMoney