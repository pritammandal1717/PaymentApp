import Heading from '../components/global/Heading'
import SubHeading from '../components/global/SubHeading'
import InputBox from '../components/global/InputBox'
import Button from '../components/global/Button'
import BottomWarning from '../components/global/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Signup() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className='z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] blur-sm bg-cover'></div>
      <div className="absolute top-0 w-screen h-screen flex justify-center items-center">
        <div className='rounded-md border-t-2 shadow-2xl p-8'>
          <div className="">
            <Heading children={"Sign Up"} />
            <SubHeading children={"Enter your information to create an"} />
            <SubHeading children={"account"} />
          </div>
          <div>
            <InputBox type={"text"} label={"Full Name"} placeholder={"John Doe"} onChange={e => {
              setFullName(e.target.value);
            }} />
            <InputBox type={"number"} label={"Mobile Number"} placeholder={"123412434"} onChange={e => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10)
              }
              setMobileNumber(e.target.value);
            }} />
            <InputBox type={"email"} label={"Email"} placeholder={"johndoe@example.com"} onChange={e => {
              setUsername(e.target.value);
            }} />
            <InputBox type={"password"} label={"Password"} placeholder={""} onChange={e => {
              setPassword(e.target.value);
            }} />
          </div>
          <div className="w-full flex flex-col mt-5">
            <Button className="w-full bg-cyan-600  hover:bg-slate-300 hover:hover:text-cyan-700 transition-all" children={"Sign Up"} onClick={() => {
              toast.promise(
                axios.post("http://localhost:3000/api/v1/user/signup", {
                  name: fullName,
                  phone: mobileNumber,
                  email: username,
                  password
                }),
                {
                  loading: "Signing Up...",
                  success: response => {
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard");
                    return "SignUp Successfull"
                  },
                  error: error => {
                    if(error.response){
                      console.log(error.response.status)
                      if(error.response.status == 409){
                        return 'Email / Phone is already registered'
                      } else if(error.response.status == 411){
                        return 'Incorrect Inputs'
                      } else if(error.response.status == 500){
                        return 'Something went wrong. Please try again.'
                      }
                    } else {
                      return "Internal Server Error"
                    }
                  }
                }
              )
            }} />
            <BottomWarning children={"Don't have an account ?"} buttonText={"Sign In"} to={"/"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup