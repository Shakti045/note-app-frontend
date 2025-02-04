import { FormEvent, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../ui/Loader";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { apiRequest } from "@/services/axios";

const SignUpForm = ({nextStep,email,setemail,password,setpassword}:{nextStep:()=>void,email:string,setemail:(email:string)=>void
    password:string,
    setpassword:(password:string)=>void
}) => {
   
    const [loading,setloading] = useState(false);

    const getotp = async(e:FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault();
            if(!email && !password){
                return toast.error("All fields required")
            }
            setloading(true);
            await apiRequest("POST","/getotp",{email:email});
            toast.success("Otp Sent to Mail ID");
            nextStep();
        } catch (error) {
            
        }finally{
            setloading(false);
        }
    }
  return (
    <form onSubmit={getotp}>
    <Card>
      <CardContent className=' flex flex-col gap-5 lg:w-[30vw] md:w-[40vw] max-sm:w-[95vw] p-7'>
      <h1 className=' font-bold text-center text-xl mb-7 '>Create A New Account</h1>
      <div className=' flex flex-col gap-2'>
      <Label htmlFor='emailid'>Email Id</Label>
      <Input id='emailid'  placeholder='Enter your email id' required value={email} onChange={(e)=>setemail(e.target.value)}/>
      </div>
      <div className=' flex flex-col gap-2'>
      <Label htmlFor='passsword'>Password</Label>
      <Input id='passsword' type='password' placeholder='Enter your password' required value={password} onChange={(e)=>setpassword(e.target.value)}/>
      </div>
      </CardContent>
      <CardFooter className=' flex flex-col gap-2 items-center justify-center'>
             <div>
             {
                 loading?<Loader/>:<Button>Get Otp</Button>
             }
             </div>
             <Link to={'/'}>Already have account? Sign In</Link>
      </CardFooter>
    </Card>
 </form>
  )
}

export default SignUpForm;