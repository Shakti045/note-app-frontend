import CreateNote from "@/components/dashboard/CreateNote"
import NoteCard from "@/components/dashboard/NoteCard";
import { RootState } from "@/redux/Store"
import { useSelector } from "react-redux"


const Feed = () => {
  const {notes,favouritenotes} = useSelector((state:RootState)=>state.note);
  return (
    <div className=" w-[100%] flex flex-wrap gap-4 hidescrollbar">
      {
        notes.map((note)=>{
          return <NoteCard key={note._id} note={note} isfav={favouritenotes.indexOf(note._id)>=0}/>
        })
      }
      <CreateNote/>
    </div>
  )
}

export default Feed