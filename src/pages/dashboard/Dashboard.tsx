import SearchResults from "@/components/dashboard/SearchResults";
import SideBar from "@/components/dashboard/SideBar"
import TopBar from "@/components/dashboard/TopBar";
import Loader from "@/components/ui/Loader";
import { set_notes } from "@/redux/slices/note";
import { RootState } from "@/redux/Store";
import { apiRequest } from "@/services/axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router"

const Dashboard = () => {
  const {token} = useSelector((state:RootState)=>state.auth);
  const [loading,setLoading] = useState(true);
  const [searchtext,setsearchtext] = useState("");
  const dispatch = useDispatch();
  

  const getallnotes = async()=>{
       try {
        if(!token) return;
        const {data}:any = await apiRequest("GET","/allnotes",null,token);
        console.log(data.notes)
        dispatch(set_notes(data?.notes));
       } catch (error) {
        
       }finally{
        setLoading(false);
       }
  }

  useEffect(()=>{
     getallnotes();
  },[token]);
  return (
    <div className=" w-full h-[100vh] flex hidescrollbar">
      {
        loading?<div className=" w-full h-full flex justify-center items-center ">
          <Loader/>
        </div>:(
          <>
            <div className=" h-full max-sm:w-0 max-sm:hidden w-[18%] hidescrollbar]">
            <SideBar/>
            </div>
            <div className="  max-sm:w-[100%] w-[82%] p-4 overflow-y-auto hidescrollbar">
              <TopBar setsearchtext={setsearchtext} searchtext={searchtext}/>
              {
                searchtext.trim().length>2?<SearchResults searchtext={searchtext}/>:<Outlet/>
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Dashboard