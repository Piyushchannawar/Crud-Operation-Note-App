import Login from "../pages/Login";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

   return(
   <BrowserRouter>
   <Routes>
       <Route index element={<NotesPage/>}/>
       <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
   )}

export default App;
