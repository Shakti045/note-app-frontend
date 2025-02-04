import { Navigate } from "react-router"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/Store";

function Protected({children}:{children:React.ReactNode}) {
    const {token}=useSelector((state:RootState)=>state.auth)
    if(token){
        return children;
    }else{
        return <Navigate to="/"></Navigate>
    }
 
}

export default Protected;