import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import  Login  from "./pages/Login.jsx"
import  Signup  from "./pages/Signup.jsx"
 import  Home  from "./pages/Home.jsx"
function App() {
  

  return (
    
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to = "/login"/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/home' element = {<Home/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
