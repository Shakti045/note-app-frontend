import { apiRequest } from "@/services/axios.js"
import { Button } from "../ui/button.js"
import { Input } from "../ui/input"
import { ModeToggle } from "../ui/mode-toggle.js"
import { useDispatch } from "react-redux"
import { set_token } from "@/redux/slices/auth.js"
import { useNavigate } from "react-router"
import { useState } from "react"
import { Loader } from "lucide-react"

const TopBar = ({setsearchtext,searchtext}:{setsearchtext:(text:string)=>void,searchtext:string}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setloading] = useState(false);
    const logout = async()=>{
        try {
            setloading(true);
            await apiRequest("GET","/logout");
            dispatch(set_token(null));
            navigate("/");
        } catch (error) {
            
        }finally{
            setloading(false);
        }
    }
  return (
       <div className=" w-full  flex max-sm:flex-col items-center gap-3  p-3 py-0 pb-3  relative">
        <Input value={searchtext} onChange={(e)=>setsearchtext(e.target.value)} placeholder="Start typing to search notes..." className=" w-full rounded-lg "/>
        <ModeToggle/>
        <Button onClick={logout}>
            {
                loading?<Loader/>:<span>Log Out</span>
            }
        </Button>
      </div>
  )
}

export default TopBar