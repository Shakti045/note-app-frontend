import { Imedia } from '@/redux/slices/note'
import ImageCard from './ImageCard'
import FileUpload from './FileInput'

const ImageSection = ({images,noteId}:{images:Imedia[],noteId:string}) => {

  return (
    <div className=' flex flex-wrap gap-3'>
        {
            images.map((image)=>{
                return <ImageCard key={image._id} url={image.url}/>
            })
        }
        <FileUpload noteId={noteId}/>
    </div>
  )
}

export default ImageSection