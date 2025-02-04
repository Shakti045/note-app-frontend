import { add_to_fav, INote, remove_from_fav, remove_note } from '@/redux/slices/note'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Ellipsis } from 'lucide-react'
import { Maximize } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Minimize } from 'lucide-react';
import ImageSection from './ImageSection';
import NoteForm from './NoteForm';
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from 'lucide-react';
import { apiRequest } from '@/services/axios';
import { RootState } from '@/redux/Store';
import toast from 'react-hot-toast';

const NoteModal = ({note,isfav}:{note:INote,isfav:boolean}) => {
    const [fullscreen,setfullscreen] = useState(false);
    const [editmode,seteditmode] = useState(false);
    const [open,setopen] = useState(false);
    const {token} = useSelector((state:RootState)=>state.auth);
    const dispatch = useDispatch();

    const deletenote = async()=>{
        const loadingtoast = toast.loading("Deleting toast....")
      try {
        await apiRequest("DELETE","/deleteNote",{noteId:note._id},token!);
        toast.success("Note deleted")
        dispatch(remove_from_fav(note._id));
        dispatch(remove_note(note._id));
      } catch (error) {
        
      }finally{
        toast.dismiss(loadingtoast);
      }
    }
    
  return (
    <Dialog open={open} onOpenChange={(open)=>{
        setopen(open);
        if(!open && editmode){
            seteditmode(false);
        }
    }}>
        <DialogTrigger>
           <button><Ellipsis/></button>
        </DialogTrigger>
        <DialogContent className={`${fullscreen && "full-screen-dialog flex flex-col gap-4"} max-h-[100vh]  overflow-y-auto hidescrollbar `}>
         {
            editmode?(<>
            <NoteForm 
            editmode = {true}
            note={note}
            closedialog={()=>{
                setopen(false);
                seteditmode(false);
            }}/>
            </>):(
                <>
                   <DialogHeader className=' mt-5 w-full  flex flex-row justify-between items-center'>
                   <button onClick={()=>setfullscreen(!fullscreen)}>
                {
                    fullscreen?<Minimize/>:<Maximize/>
                }
            </button>
            <div className=' flex gap-2 items-center'>
                <button onClick={()=>seteditmode(true)}><Pencil/></button>
                <button><Heart onClick={()=>{
                    if(isfav){
                        dispatch(remove_from_fav(note._id));
                    }else{
                        dispatch(add_to_fav(note._id));
                    }
                }} className={`${isfav && "text-red-500"}`}/></button>
                <button>
                    <Trash onClick={deletenote} className=' text-red-700'/>
                </button>
            </div>
        </DialogHeader>
        <h1 className=' font-bold text-lg'>{note.title}</h1>
        <p>
            {
                fullscreen?note.description:`${note.description?.substring(0,600)} ${note.description?.length!>=600 && "....."}`
            }
        </p>
        <ImageSection images={note.images} noteId={note._id}/>
                </>
            )
         }
        </DialogContent>
    </Dialog>
  )
}

export default NoteModal