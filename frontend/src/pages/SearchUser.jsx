import { useState } from "react";
import Button from "../components/global/Button";
import InputBox from "../components/global/InputBox";
import NavBar from "../components/NavBar"
import Heading from "../components/global/Heading";
import SubHeading from "../components/global/SubHeading";
import axios from 'axios';
import Profile from "../components/global/Profile";
import { useNavigate } from "react-router-dom";
import Footer from "../components/global/Footer";

function SerchUser() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div className="z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] bg-repeat-y bg-cover"></div>
      <div className="absolute top-0 backdrop-blur-2xl w-screen h-screen flex flex-col justify-between">
        <NavBar />
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center p-3 md:p-5 shadow-md rounded-md border-t-2">
            <Heading children={"Send Money"} />
            <SubHeading children={"Enter a mobile number to search"} />
            <SubHeading children={"PayHere Users"} />
            <div className="flex flex-col justify-center mt-5">
              <InputBox label={"Mobile Number"} type="number" placeholder="1111122222" onChange={e => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10)
                }
                if (e.target.value.length == 10) {
                  setDisabled(false)
                }
                setPhone(e.target.value);
              }} />
              <div className="font-semibold text-slate-200 my-5">
                <Button className="w-[350px] bg-cyan-600 disabled:text-cyan-700" children={"Search User"} disabled={disabled} onClick={async () => {
                  let data = JSON.stringify({
                    "phone": phone
                  });

                  let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://paymentapp-sqmb.onrender.com/api/v1/user/search-by-phone',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    data: data
                  };

                  axios.request(config)
                    .then((response) => {
                      setUser(response.data)
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }} />
              </div>
              <div className="text-center font-mono text-slate-200">
                {
                  user ? user.name ? (
                    <div className="mt-5 flex flex-row items-center justify-between">
                      <div className='flex flex-row items-center mr-10'>
                        <Profile className='bg-slate-300' firstname={user.name} lastname={user.name} />
                        <p className='ml-2 font-medium text-md text-slate-200' >{user.name}</p>
                      </div>
                      <div>
                        <Button className="bg-cyan-600" children={"Send Money"} onClick={() => {
                          navigate("/send?id=" + user.id + "&name=" + user.name)
                        }} />
                      </div>
                    </div>
                  ) : "No User Exists" : "Enter a number to search user"
                }
              </div>
            </div>
          </div>
        </div >
        <Footer />
      </div >
    </>
  )
}

export default SerchUser