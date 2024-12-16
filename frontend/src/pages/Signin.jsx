import axios from "axios"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className='z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] blur-sm bg-cover'></div>
      <div className="absolute top-0 w-screen h-screen flex justify-center items-center">
        <div className='rounded-md border-t-2 p-8 shadow-2xl'>
          <div>
            <Heading children={"Sign In"} />
            <SubHeading children={"Enter your credentials to sign in"} />
          </div>
          <div className="flex flex-row justify-between mt-5">
            <Button className="w-2/5 bg-cyan-700 cursor-not-allowed" children={"Email"} onClick={() => {

            }} />
            <Button className="w-2/5 bg-cyan-600 hover:bg-slate-300 hover:hover:text-cyan-700 transition-all" children={"OTP"} onClick={() => {
              navigate("/verify")
            }} />
          </div>
          <div>
            <InputBox type={"email"} label={"Email"} placeholder={"johndoe@example.com"} onChange={e => {
              setEmail(e.target.value);
            }} />
            <InputBox type={"password"} label={"Password"} placeholder={""} onChange={e => {
              setPassword(e.target.value);
            }} />
          </div>
          <div className="w-full flex flex-col mt-5">
            <Button className="w-full bg-cyan-600 hover:bg-slate-300 hover:hover:text-cyan-700 transition-all" children={"Sign In"} onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                email,
                password
              })
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }} />
            <div className="w-full flex-col justify-center mt-5">
              <BottomWarning children={""} buttonText={"Forgot Password ?"} to={"/signup"} />
              <BottomWarning children={"Don't have an account ?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin