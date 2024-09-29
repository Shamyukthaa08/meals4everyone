import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importing Axios
import { handleError, handleSuccess } from './Registration/util';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const response = await axios.get(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setProducts(response.data);  // Assuming the products are directly in response.data
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((item, index) => (
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
  );
}

export default Home;
