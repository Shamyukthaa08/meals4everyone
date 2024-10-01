import { useEffect, useState }from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './Registration/util';


function AdminBoard() {
    const [adminProducts, setAdminProducts ] = useState('');
    const navigate = useNavigate();
    const handleLogout = () =>{
      localStorage.removeItem('token');
      localStorage.removeItem('loggesInUser');
      handleSuccess("user logged out successfully");
      setTimeout(()=>{
        navigate('/login');
      }, 1000)
    }
    
    const fetchProducts = async ()=>{
        try{
            const url = "http://localhost:8080/products/admin";
            const response = await axios.get(url, {
              headers:{
                'Authorization': localStorage.getItem('token')
              }
            });
            setAdminProducts(response.data);
        }catch(err){
            handleError(err);
        }
    };

    useEffect(()=>{
      fetchProducts();
    }, []);

  return (
    <div>
      <div>
        {adminProducts.length > 0 ? (
          <ul>
            {adminProducts.map((item, index) => (
              <li key={index}>{item.name}: {item.price}</li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  )
}
export default AdminBoard;
