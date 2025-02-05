import { Card, CardContent } from "../ui/card"

const SearchNoteCard = ({note}:{note:any}) => {
  return (
    <Card  className=' cursor-pointer hover:opacity-50 transition-opacity duration-300  h-[250px] w-[calc(96%/4)] max-sm:w-full flex flex-col justify-around'>
        <CardContent className='   flex flex-col gap-2 mt-2'>
        <h1 className='truncate font-bold text-lg'>{note.title}</h1>
        <p className=' h-[170px] overflow-hidden '>{note.content?.substring(0,200)}{note.content?.length!>=200&& "......"}</p>
        </CardContent>
    </Card>
  )
}

export default SearchNoteCard