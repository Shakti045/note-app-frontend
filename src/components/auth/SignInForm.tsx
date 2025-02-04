import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Loader from '../ui/Loader'
import toast from 'react-hot-toast'
import { apiRequest } from '@/services/axios'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { set_token } from '@/redux/slices/auth'

const SignInForm = () => {
    const [ email , setemail ] = useState('');
    const [ password , setpassword ] = useState('');
    const [loading,setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (e:FormEvent<HTMLFormElement>) =>{
        try {
            e.preventDefault();
            setloading(true);
            if(!password || !email){
                return toast.error("Please enter emailid and password")
            }
            const {data}:any = await apiRequest("POST","/login",{email,password});
            dispatch(set_token(data?.token));
            navigate("/dashboard");
        } catch (error) {
            
        }finally{
            setloading(false);
        }
    }
  return (
    <form onSubmit={login}>
       <Card>
         <CardContent className=' flex flex-col gap-5 lg:w-[30vw] md:w-[40vw] max-sm:w-[95vw] p-7'>
         <h1 className=' font-bold text-center text-xl mb-7 '>Sign In To Your Account</h1>
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
                    loading?<Loader/>:<Button>Sign In</Button>
                }
                </div>
                <Link to={'/signup'}>Don't have account? Sign Up</Link>
         </CardFooter>
       </Card>
    </form>
  )
}

export default SignInForm;