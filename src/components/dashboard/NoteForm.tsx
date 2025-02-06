import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import SpeechToText from './SpeechToText'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/Store'
import toast from 'react-hot-toast'
import { apiRequest } from '@/services/axios'
import Loader from '../ui/Loader'
import { add_note, INote, update_note } from '@/redux/slices/note'

const NoteForm =  ({closedialog,editmode,note}:{closedialog:()=>void,editmode?:boolean,note?:INote}) => {
  const [title,setTitle] = useState('');
  const [description,setdescription] = useState('');
  const [type,setType] = useState("Text");
  const [loading,setLoading] = useState(false);
  const {token} = useSelector((state:RootState)=>state.auth);
  const dispatch = useDispatch();


  useEffect(()=>{
    if(editmode){
      setTitle(note?.title!);
      setdescription(note?.description!)
      setType(note?.createdfrom!)
    }
  },[editmode])

  const createNote = async (e:FormEvent<HTMLFormElement>)=>{
    try {
      e.preventDefault();
      if(!title || !description || !type){
        return toast.error("Title and description is required")
      }
      if(!token) return;
      setLoading(true);
      const {data}:any = await apiRequest("POST","/createnote",{title,description,type},token);
      toast.success("Note created");
      dispatch(add_note(data.note));
      closedialog();
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }
  

  const editnote = async(e:FormEvent<HTMLFormElement>)=>{
    try {
      e.preventDefault();
      setLoading(true);
      const {data}:any = await apiRequest("POST","/updateNote",{title,description,type,noteId:note?._id},token!);
      toast.success("Note Updated")
      dispatch(update_note(data?.note));
      closedialog();
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={editmode?editnote:createNote} className=' flex flex-col gap-5 mt-8'>
       <div className=' flex flex-col gap-2'>
       <div className=' w-full flex items-center justify-between'>
       <Label htmlFor='title' className=' text-lg'>Give title to your note</Label>
       <SpeechToText setValue={(text)=>{
        setTitle(text);
       }} changeType={()=>{
        if(type!="Audio") setType("Audio");
      }}/>
       </div>
       <Input id='title' value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder='Enter title of note'/>
       </div>
       <div className=' flex flex-col gap-2'>
        <div className=' w-full flex items-center justify-between'>
        <Label htmlFor='desc' className=' text-lg'>Description of Note</Label>
        <SpeechToText setValue={(text)=>{
          setdescription(text);
        }} changeType={()=>{
          if(type!="Audio") setType("Audio");
        }}/>
        </div>
        <Textarea id='desc' value={description} onChange={(e)=>{
          // if(type!="Text") setType("Text");
          setdescription(e.target.value)
        }} required rows={10}  placeholder='Enter Description of note'/>
       </div>
       {
        loading?<div className=' w-full flex justify-center items-center'>
          <Loader/>
        </div>:<Button className=' w-fit mx-auto'>
          {
            editmode?"Update Note":"Create Note"
          }
        </Button>
       }
    </form>
  )
}

export default NoteForm