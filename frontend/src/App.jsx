import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/Registration/Login.jsx";
import Signup from "./pages/Registration/Signup.jsx";
import UserBoard from "./pages/UserBoard/Userboard.jsx";
import { useState } from 'react';
import RefreshHandler from './RefreshHandler.jsx';
import AdminBoard from './pages/Adminboard/AdminBoard.jsx';
import Surprisebag from './pages/Adminboard/Createbag/SurpriseBag.jsx';
import OrderBag from './pages/UserBoard/Order/Ordersurprise.jsx'
import ManageBag from './pages/Adminboard/ManageBag/Managebag.jsx';
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
          <Route path='/userboard' element={<PrivateRoute element={<UserBoard />} isAuthenticated={isAuthenticated} />} />
          <Route path='/surprisebag' element={<Surprisebag/>} />
          <Route path='/orderbag' element={<OrderBag/>} />
          <Route path='/managebags' element={<ManageBag/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
