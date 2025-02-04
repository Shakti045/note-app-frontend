import React, { useState } from "react";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Loader from "../ui/Loader";
import { apiRequest } from "@/services/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { add_media } from "@/redux/slices/note";

const FileUpload = ({noteId}:{noteId:string}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading,setloading] = useState(false);
  const {token} = useSelector((state:RootState)=>state.auth);
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("noteId", noteId);

    try {
        setloading(true);
        const {data}:any = await apiRequest("POST","/addimage",formData,token!);
        dispatch(add_media(data.media));
        setPreview(null);
        setFile(null);
    } catch (error) {
        
    }finally{
        setloading(false);
    }
      
  };

  return (
      <>
         <Label htmlFor='fileinput'>
           {
             preview?(<div className=" flex flex-col gap-2 items-center">
              <img src={preview} alt="previewimage" className=" cursor-pointer  border-2 rounded-md w-[180px] h-[200px]"/>
                {
                    loading?<Loader/>:<Button onClick={handleUpload} >Upload</Button>
                }
             </div>):(
             <div className=" cursor-pointer flex flex-col   border-2 rounded-md w-[180px] h-[200px] justify-center items-center gap-3"> 
             <Plus/>
            <p>Add Image</p>
            </div>)
           }
        </Label>
        <input onChange={handleFileChange} id='fileinput' type='file' className=' hidden '/>
      </>
  );
};

export default FileUpload;
