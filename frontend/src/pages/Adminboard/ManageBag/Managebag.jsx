import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../../Navbar/Navbar";
import './manage.css';

export default function Managebag() {
  const [selectBag, setSelectBag] = useState([]); // Initialize as an empty array

  const getBagsByName = async () => {
    const name = localStorage.getItem('loggedInUser'); // Assuming 'name' is stored in localStorage

    try {
      const response = await axios.get(`http://localhost:8080/admin/getbags/${name}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setSelectBag(response.data.bags);
    } catch (err) {
      console.log("An error has occurred:", err);
    }
  };

  const updateBag = async (id, updatedValues) => {
    try {
      await axios.put(`http://localhost:8080/admin/updatebag/${id}`, updatedValues, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      getBagsByName(); // Refresh the bag list
    } catch (err) {
      console.error("Error updating bag:", err);
    }
  };

  // New function to handle order completion
  const handleOrderComplete = (bagId, orderedItem) => {
    const updatedBags = selectBag.map((bag) => {
      if (bag._id === bagId) { // Assuming each bag has a unique `_id`
        return {
          ...bag,
          ordered: bag.ordered.filter(item => item !== orderedItem) // Remove the completed item
        };
      }
      return bag;
    });

    setSelectBag(updatedBags); 

 
    updateBag(bagId, { ordered: updatedBags.find(bag => bag._id === bagId).ordered });
  };

  useEffect(() => {
    getBagsByName();
  }, []);

  return (
    <div className="Manage">
      <Navbar />
      <div className="manage-container">
        {selectBag.length > 0 ? (
          selectBag.map((item, index) => (
            <div key={index} className="manage-orders">
              {item.ordered && item.ordered.length > 0 && (
                item.ordered.map((element, idx) => (
                  <div key={idx} className="manage-bag">
                    <div className="category-1">
                      <p className="manage-category">
                        <strong className="manage-category-strong">Category: </strong>{item.category}
                      </p>
                      <p className="manage-price">
                        <strong className="manage-price-strong">Price: </strong>₹{item.price}
                      </p>
                    </div>
                    <p className="manage-pickupTimings">
                      <strong className="manage-pickupTimings-strong">Pickup Timings: </strong>{item.pickupTimings}
                    </p>
                    <div className="possible-items-div">
                      <p className="possible-items">
                        <strong>Items in the bag: </strong><br/>{item.possibleItems.join(",")}
                      </p>
                    </div>
                    <div className="category-2">
                      <p className="manage-ordered">
                        <strong className="manage-ordered-strong">Order Name: </strong>{element}
                      </p>
                      <button 
                        className="order-done"
                        onClick={() => handleOrderComplete(item._id, element)} // Pass bag ID and ordered item
                      >
                        Order Completed
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))
        ) : (
          <p>No bags found.</p>
        )}
      </div>
    </div>
  );
}
