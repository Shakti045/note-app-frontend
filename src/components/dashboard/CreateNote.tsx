import { Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import NoteForm from './NoteForm';
import { useState } from 'react';
  

const CreateNote = () => {
  const [open, setOpen] = useState(false);
  return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='w-[calc(96%/4)] max-sm:w-full'>
        <Card className=' cursor-pointer h-[370px] w-full flex justify-center items-center'>
            <CardContent className=' flex flex-col gap-3 justify-center items-center'>
                <Plus size={100}></Plus>
                <p className=' font-bold text-2xl'>Create A New Note</p>
            </CardContent>
        </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
                Create Your Own Note
            </DialogTitle>
            <DialogDescription>
                 <NoteForm closedialog={()=>setOpen(false)}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}

export default CreateNote