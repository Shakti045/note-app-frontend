import { Navigate, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/Store";
import { useEffect, useState } from "react";
import { apiRequest } from "@/services/axios";
import { set_token } from "@/redux/slices/auth";
import Loader from "../ui/Loader";

function Public({children}:{children:React.ReactNode}) {

    const {token}=useSelector((state:RootState)=>state.auth);
    const [loading,setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getToken = async()=>{
        try {
            setloading(true);
            const {data}:any = await apiRequest("GET","/checktoken");
            if(data.success){
                dispatch(set_token(data.token));
                navigate("/dashboard");
            }
        } catch (error) {
            
        }finally{
            setloading(false);
        }
    }

    useEffect(()=>{
      if(token==null){
        getToken();
      }
    },[]);

    if(token===null){
        return loading?(
        <div className=' w-full h-[100vh] flex justify-center items-center'>
            <Loader/>
        </div>):children;
    }else{
        return <Navigate to="/dashboard"></Navigate>
    }
}

export default Public