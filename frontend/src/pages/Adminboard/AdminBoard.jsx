// import { useEffect, useState }from 'react'
// import axios from 'axios';
// import { handleError } from './Registration/util';
import { Navbar } from '../Navbar/Navbar';
import  veggiebag  from '../../assets/paper-bag.png';
import './admin.css';



function AdminBoard() {
    // const [adminProducts, setAdminProducts ] = useState('');
   
    
    
    // const fetchProducts = async ()=>{
    //     try{
    //         const url = "http://localhost:8080/products/admin";
    //         const response = await axios.get(url, {
    //           headers:{
    //             'Authorization': localStorage.getItem('token')
    //           }
    //         });
    //         setAdminProducts(response.data);
    //     }catch(err){
    //         handleError(err);
    //     }
    // };

    // useEffect(()=>{
    //   fetchProducts();
    // }, []);

  return (
    <div className="AdminBoard">
    <Navbar/>
    <div className='admin-header'>

    <div className='admin-main'>
        <h1 className='main-heading'> Mix, Match, and Marvel!</h1>
        <p>Create Surprise Bags filled with surplus food at discounted prices, offering your customers an exciting way to enjoy delicious items while helping to minimize food waste!</p>
    </div>
    
      <img src={ veggiebag } alt='paper-bag-veggie' width='1000px' height='600px'/>
    </div>
    
      {/* <div>
        {adminProducts.length > 0 ? (
          <ul>
            {adminProducts.map((item, index) => (
              <li key={index}>{item.name}: {item.price}</li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>    */}
    
    </div>
  )
}
export default AdminBoard;
