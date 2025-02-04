import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Button } from "../ui/button";
import { useState } from "react";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";
import { apiRequest } from "@/services/axios";
import { useNavigate } from "react-router";

const OtpForm = ({prevStep,email,password}:{prevStep:()=>void,email:string,password:string}) => {
    const [loading,setloading] = useState(false);
    const [otp,setotp] = useState('');
    const navigate = useNavigate();

    const signup = async()=>{
        try {
            if(!email || !password || !otp){
                return toast.error("All fields are required");
            }
            setloading(true);
            await apiRequest("POST","/signup",{email,password,otp});
            toast.success("Account created! Login to you account")
            navigate("/");
        } catch (error) {
            
        }finally{
            setloading(false);
        }
    }
  return (
    <div className=" flex flex-col gap-5">
        <InputOTP maxLength={6} onChange={(otp)=>{
            setotp(otp);
        }}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
        </InputOTP>
        <div className=" w-full flex items-center justify-between">
            {
                loading?<div className=" w-full flex justify-center items-center">
                  <Loader></Loader>
                </div>:(
                    <>
                    <Button onClick={prevStep}>Change Email</Button>
                    <Button onClick={signup}>Create Account</Button>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default OtpForm;
  