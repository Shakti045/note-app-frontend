import { Link, useLocation } from 'react-router';
import image from '../../assets/download.png'
import { House } from 'lucide-react';
import { Star } from 'lucide-react';
import { useTheme } from '../ui/theme-provider';
const SideBar = () => {
    const {pathname} = useLocation();
    const {theme} = useTheme();
  return (
    <div className=" h-full w-full flex flex-col gap-2  border-r-2">
       <div className='p-4 flex gap-3 border-b-2 mx-4 '>
         <img src={image} alt="logo" height={30} width={30} className=' rounded-md'/>
         <h1 className=' font-bold text-lg'>AI NOTES</h1>
       </div>
       <div className=' flex flex-col'>
        <Link to={"/dashboard"} className={`flex items-center gap-3 p-4 ${pathname==="/dashboard" && (
          theme==="dark"?"bg-purple-900":" bg-slate-200"
        )} mx-4 rounded-md `}>
        <House/>
        <p>Home</p>
        </Link>
        <Link to={"/favourites"} className={`flex items-center gap-3 p-4 ${pathname==="/favourites" && (
          theme==="dark"?"bg-purple-900":" bg-slate-200"
        )} mx-4 rounded-md `}>
        <Star/>
        <p>Favourite</p>
        </Link>
       </div>
    </div>
  )
}

export default SideBar