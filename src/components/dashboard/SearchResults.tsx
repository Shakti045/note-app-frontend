import { useEffect, useState } from "react"
import Loader from "../ui/Loader"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { apiRequest } from "@/services/axios";
import SearchNoteCard from "./SearchNoteCard";

const SearchResults = ({searchtext}:{searchtext:string}) => {
    const [notes,setnotes] = useState([]);
    const [loading,setloading] = useState(false);
    const {token} = useSelector((state:RootState)=>state.auth);

    const getnotes = async()=>{
        try {
            if(searchtext.length<=2) return;
            setloading(true);
            const {data}:any = await apiRequest("GET",`/searchnotes?text=${searchtext}`,null,token!);
            setnotes(data?.notes);
        } catch (error) {
            
        }finally{
            setloading(false);
        }
    }

    useEffect(()=>{
        getnotes();
    },[searchtext]);

  return (
    <>
    {
        !loading && notes.length>0 && (
            <div className="">
                {
                    notes.map((note)=>{
                        return <SearchNoteCard note={note}/>
                    })
                }
            </div>
        )
    }
       {
        loading && (
            <div className=" w-full h-[80vh] flex justify-center items-center">
               <Loader/>
           </div>
        )
       }
       {
        !loading && notes.length==0 && (
            <div className=" w-full h-[80vh] flex justify-center items-center">
               <p>No Notes Found</p>
           </div>
        )
       }
    </>
  )
}

export default SearchResults