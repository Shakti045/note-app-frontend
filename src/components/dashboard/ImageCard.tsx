
const ImageCard = ({url}:{url:string}) => {
  return (
    <div className='border-2 rounded-md w-[180px] h-[200px] justify-center items-center gap-3'>
        <img src={url}  className="rounded-md w-full h-full"/>
    </div>
  )
}

export default ImageCard