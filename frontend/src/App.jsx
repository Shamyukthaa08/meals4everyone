import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/Registration/Login.jsx";
import Signup from "./pages/Registration/Signup.jsx";
import Home from "./pages/Home.jsx";
import { useState } from 'react';
import RefreshHandler from './RefreshHandler.jsx';
import AdminBoard from './pages/Adminboard/AdminBoard.jsx';
import Surprisebag from './pages/Adminboard/Createbag/SurpriseBag.jsx';
import 'react-toastify/ReactToastify.css';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='App'>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/adminboard' element={<PrivateRoute element={<AdminBoard/>} isAuthenticated={isAuthenticated}/>}/>
          <Route path='/home' element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
          <Route path='/surprisebag' element={<Surprisebag/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
