import NoteCard from '@/components/dashboard/NoteCard';
import { RootState } from '@/redux/Store';
import { useSelector } from 'react-redux';

const Favourite = () => {
  const {notes,favouritenotes} = useSelector((state:RootState)=>state.note);
  return (
    <div className=" w-[100%] flex flex-wrap gap-4 ">
      {
        notes.map((note)=>{
          if(favouritenotes.indexOf(note._id)==-1) return;
          return <NoteCard key={note._id} note={note} isfav={true}/>
        })
      }
    </div>
   )
}

export default Favourite