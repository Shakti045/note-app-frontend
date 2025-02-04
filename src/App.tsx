import { Routes ,Route} from "react-router"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Dashboard from "./pages/dashboard/Dashboard"
import Favourite from "./pages/dashboard/Favourite"
import Feed from "./pages/dashboard/Feed"
import Public from "./components/auth/Public"
import Protected from "./components/auth/Protected"

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Public><SignIn/></Public>}/>
       <Route path="/signup" element={<Public><SignUp/></Public>}/>
       <Route  element={<Protected><Dashboard/></Protected>}>
          <Route path="/dashboard" element={<Feed/>}/>
          <Route path="/favourites" element={<Favourite/>}/>
       </Route>
    </Routes>
   )
}

export default App