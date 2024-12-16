import { useState } from "react"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Profile from "../components/Profile"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
// import { Message, useToaster } from 'rsuite';

function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  // const [type, setType] = useState('info');
  // const [placement, setPlacement] = useState('topCenter');
  // const toaster = useToaster();

  // const message = (
  //     <Message showIcon type={"warning"} closable className="absolute top-0 bg-cyan-600 m-10 rounded-md flex flex-col items-center px-5 py-2"> <p>The message appears on the {placement}</p>.
  //     </Message>
  // );
  const [state, setState] = useState({
    errorMessage : ""
  })

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
              const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                recipientId: id,
                amount: amount
              },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                  }
                })
                .catch(err => {
                  setState({ errorMessage: err.message });
                })
              if (res.data.message == "Transfer successful") {
                navigate("/dashboard")
              } else {
                <p className="text-slate-100">{res.data.message}</p>
              }
            }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SendMoney