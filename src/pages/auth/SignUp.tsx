import OtpForm from "@/components/auth/OtpForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useState } from "react"

const SignUp = () => {
  const [ email , setemail ] = useState('');
  const [ passsword , setpassword ] = useState('');
  const [step,setstep] = useState(1);
  return (
    <div className=" w-full h-[100vh] flex justify-center items-center ">
        {
          step==1 && <SignUpForm email={email} setemail={setemail} password={passsword}  setpassword = {setpassword}  nextStep={()=>setstep(2)}/>
        }
        {
          step==2 && <OtpForm email={email} password={passsword} prevStep={()=>setstep(1)}/>
        }
    </div>
  )
}

export default SignUp