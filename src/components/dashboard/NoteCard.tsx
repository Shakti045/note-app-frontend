import { INote } from '@/redux/slices/note'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Play } from 'lucide-react';
import { Type } from 'lucide-react';
import { Image } from 'lucide-react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import NoteModal from './NoteModal';
import { useTheme } from '../ui/theme-provider';


const NoteCard = ({note,isfav}:{note:INote,isfav:boolean}) => {
    const coapyText = ()=>{
        const textToCopy = `${note.title}\n\n${note.description}`;
        navigator.clipboard.writeText(textToCopy)
      .then(() => {
         toast.success("Text copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy text")
      });
    }
    const {theme} = useTheme();
  return (
    <Card className='  h-[370px] w-[calc(96%/4)] max-sm:w-full flex flex-col justify-between'>
        <CardContent className='   flex flex-col gap-2 mt-2'>
            <div className=' flex justify-between items-center'>
                <p>{new Date(note.createdat).toLocaleString()}</p>
                <div className={` flex items-center gap-2  px-2 py-1 text-sm rounded-md ${theme==="dark"?"bg-purple-500":"bg-slate-200"}`}>
                    {
                        note?.createdfrom==="Text"?(
                            <>
                             <Type size={15}/>
                             <p>Text</p>
                            </>
                        ):(
                            <>
                             <Play size={15}/>
                             <p>Audio</p>
                            </>
                        )
                    }
                </div>
            </div>
            <h1 className='truncate font-bold text-lg'>{note.title}</h1>
            <p className=' h-[170px] overflow-hidden '>{note.description?.substring(0,200)}{note.description?.length!>=200&& "......"}</p>
            <div className={`w-fit flex items-center gap-2 p-2 rounded-md ${theme==="dark"?"bg-purple-500":"bg-slate-200"} mt-2`}>
                <Image/>
                <p>{note.images.length} images</p>
            </div>
        </CardContent>
        <CardFooter className=' w-full flex justify-end'>
            <div className=' flex items-center gap-2  '>
                <button onClick={coapyText}><Copy/></button>
                <NoteModal note={note} isfav={isfav}/>
            </div>
        </CardFooter>
    </Card>
  )
}

export default NoteCard