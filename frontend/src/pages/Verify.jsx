import { useState } from "react";
import BottomWarning from "../components/global/BottomWarning";
import Button from "../components/global/Button";
import Heading from "../components/global/Heading";
import InputBox from "../components/global/InputBox";
import SubHeading from "../components/global/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from 'react-otp-input';
import { toast } from 'sonner'

function Verify() {
    const [number, setNumber] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const [otp, setOtp] = useState('');

    return (
        <>
            <div className='z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] blur-sm bg-cover'></div>
            <div className="absolute top-0 w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center p-8 shadow-2xl rounded-md border-t-2">
                    <Heading children={"Login Via OTP"} />
                    <SubHeading children={"Enter your mobile number to get"} />
                    <SubHeading children={"OTP"} />
                    <div className="flex flex-row justify-between mt-5">
                        <Button className="w-2/5 bg-cyan-600 hover:bg-slate-300 hover:hover:text-cyan-700 transition-all" children={"Email"} onClick={() => {
                            navigate("/")
                        }} />
                        <Button className="w-2/5 bg-cyan-700 cursor-not-allowed" children={"OTP"} onClick={() => {

                        }} />
                    </div>
                    {phone ?
                        <div className="w-full flex flex-col justify-center mt-5">
                            <SubHeading children={`OTP sent to +91${phone}`} />
                            <div className="w-full flex flex-row justify-around mt-5 ">
                                <OtpInput
                                    inputStyle={{
                                        border: "1px solid transparent",
                                        borderRadius: "6px",
                                        width: "50px",
                                        height: "50px",
                                        fontSize: "20px",
                                        color: "#000",
                                        fontWeight: "400",
                                        caretColor: "blue"
                                    }}
                                    focusStyle={{
                                        border: "1px solid #CFD3DB",
                                        outline: "none"
                                    }}
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    renderSeparator={0}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                            <div className="font-semibold text-slate-200 mt-5">
                                <Button className="w-full bg-cyan-600" onClick={async () => {
                                    toast.promise(
                                        axios.post("https://paymentapp-sqmb.onrender.com/api/v1/user/signin-via-otp", {
                                            otp,
                                            phone
                                        }),
                                        {
                                            loading: "Verifying OTP...",
                                            success: (response) => {
                                                localStorage.setItem("token", response.data.token);
                                                navigate("/dashboard");
                                                return "Signin Successful"
                                            },
                                            error: error => {
                                                if (error.response) {
                                                    if (error.response.status == 411) {
                                                        return "OTP is wrong"
                                                    } else if (error.response.status == 404) {
                                                        return "User not found"
                                                    } else {
                                                        return "Something went wrong"
                                                    }
                                                } else {
                                                    return 'Internal Server Error'
                                                }
                                            }
                                        }
                                    )
                                }}>Submit</Button>
                            </div>
                            <div className="mt-3 flex items-center justify-center">
                                <button className="font-medium ml-1 text-cyan-300" onClick={() => {
                                    toast.promise(
                                        axios.post("https://paymentapp-sqmb.onrender.com/api/v1/user/get-otp", {
                                            number
                                        }
                                        ), {
                                        loading: "Getting OTP...",
                                        success: (response) => {
                                            setPhone(number)
                                            return "OTP sent successfully. Check Your Mobile."
                                        },
                                        error: error => {
                                            if (error.response) {
                                                if (error.response.status == 404) {
                                                    return 'No user found with this number.'
                                                } else if (error.response.status == 410) {
                                                    return "Error generating OTP. Please try again."
                                                } else {
                                                    return 'Something went wrong.'
                                                }
                                            } else {
                                                return "Internal Server Error"
                                            }
                                        }
                                    }
                                    )
                                }}>Resend OTP</button>
                            </div>
                            <div className="mt-3 flex flex-row justify-center items-center text-slate-100 font-mono">
                                <p className="font-medium justify-center items-center">Typed Wrong Number?</p>
                                <button className="font-medium ml-1 text-cyan-300" onClick={(e) => {
                                    e.preventDefault()
                                    setNumber("")
                                    setPhone("");
                                }}> Back</button>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col justify-center mt-5">
                            <InputBox label={"Mobile Number"} type="number" placeholder="1111122222" onChange={e => {
                                if (e.target.value.length > 10) {
                                    e.target.value = e.target.value.slice(0, 10)
                                }
                                if (e.target.value.length == 10) {
                                    setDisabled(false)
                                }
                                setNumber(e.target.value);
                            }} />
                            <div className="font-semibold text-slate-200 my-5">
                                <Button className="w-full bg-cyan-600 disabled:text-cyan-700" children={"Get OTP"} disabled={disabled} onClick={() => {
                                    toast.promise(
                                        axios.post("https://paymentapp-sqmb.onrender.com/api/v1/user/get-otp", {
                                            number
                                        }
                                        ), {
                                        loading: "Getting OTP...",
                                        success: (response) => {
                                            setPhone(number)
                                            return "OTP sent successfully. Check Your Mobile."
                                        },
                                        error: error => {
                                            if (error.response) {
                                                if (error.response.status == 404) {
                                                    return 'No user found with this number.'
                                                } else if (error.response.status == 410) {
                                                    return "Error generating OTP. Please try again."
                                                } else {
                                                    return 'Something went wrong.'
                                                }
                                            } else {
                                                return "Internal Server Error"
                                            }
                                        }
                                    }
                                    )
                                }} />
                            </div>
                            <div className="w-full flex-col justify-center">
                                <BottomWarning children={"Don't have an account ?"} buttonText={"Sign Up"} to={"/signup"} />
                            </div>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Verify