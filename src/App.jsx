
import { Route, Routes } from 'react-router';
import HomeNav  from "./Components/HomeNav";
import HomePage from './Components/HomePage';
import CreatePage from "./Components/CreatePage";
import ReadPage from "./Components/ReadPage";
import UpdatePage from "./Components/UpdatePage";
import DeletePage from "./Components/DeletePage";
import Register from "./Components/UserAuth/Register";
import Login from "./Components/UserAuth/Login";

function App(props) {
  

  return (
    <>
    <Routes>
      <Route path='/' element={< HomeNav/>}>
      <Route index element={<HomePage/>}/>
      <Route path='/create-page' element={<CreatePage/>}/>
      <Route path='/read-page/:id' element={<ReadPage/>}/>
      <Route path='/update-page/:id' element={<UpdatePage/>}/>
      <Route path='/delete-page/:id' element={<DeletePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
      
    </>
  );
}

export default App;
