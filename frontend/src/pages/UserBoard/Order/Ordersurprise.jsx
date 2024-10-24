import { useState, useEffect } from "react";
import { Navbar } from "../../Navbar/Navbar";
import axios from "axios";
import "./order.css";
import food from '../../../assets/food1.jpg';
import grocery from '../../../assets/grocery.jpg';
import pasteries from '../../../assets/pasteries.jpg';
import pulses from '../../../assets/pulses.jpg';
import all from '../../../assets/food.jpg';
import snacks from '../../../assets/snacks.jpg';

export default function Ordersurprise() {
  const [surpriseBag, setSurpriseBag] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBag, setSelectedBag] = useState(null);

  // Toggle modal state
  const toggleModel = () => setModal(!modal);

  // Get category-specific images
  const getImageForCategory = (category) => {
    switch (category) {
      case 'Grocery': return grocery;
      case 'Ready to eat': return food;
      case 'Bread & Pasteries': return pasteries;
      case 'Snacks': return snacks;
      case 'Pulses, Rice & Oil': return pulses;
      default: return all;
    }
  };

  // Fetch surprise bags from API
  const getbags = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/getbags', {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      setSurpriseBag(response.data.bags); // Assuming response contains an array of bags
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  // Update a specific bag in the backend
  const updateBag = async (id, updatedValues) => {
    try {
      await axios.put(`http://localhost:8080/admin/updatebag/${id}`, updatedValues, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });
      getbags(); // Refresh the bags after the update
      toggleModel(); // Close the modal
    } catch (err) {
      console.error("Error updating bag:", err);
    }
  };

  // Handle order confirmation
  const handleUpdate = (id) => {
    const loggedInUser = localStorage.getItem('loggedInUser'); // Parse the user data from localStorage

    const updatedBag = {
      ...selectedBag,
      numberOfBags: selectedBag.numberOfBags - 1, // Decrement the bag count
      ordered: [...(selectedBag.ordered || []), loggedInUser], // Add the logged-in user to the ordered list
    };

    updateBag(id, updatedBag);
  };

  // Fetch bags on component mount
  useEffect(() => {
    getbags();
  }, []);

  // Open the modal with the selected bag
  const handleBookNow = (item) => {
    setSelectedBag(item);
    toggleModel();
  };

  return (
    <div>
      <Navbar />
      <div className="surprise-content">
        <div className="surprisebag">
          {surpriseBag.length > 0 ? (
            surpriseBag.map((item, index) => (
              <div className="surprise-card-componenet" key={index}>
                <div className="card-1">
                  <div className="card-color">
                    <img
                      src={getImageForCategory(item.category)}
                      alt={item.category}
                      className="order-image"
                    />
                  </div>
                </div>
                <div className="card-2">
                  <div className="orders-location">
                    <p className="card-1-name">{item.name}</p>
                    <p className="card-1-location">{item.location}</p>
                  </div>
                  <p className="card-1-category">{item.category}</p>
                  <p className="card-1-price">
                    <strong className="sub-time">Timings: </strong>
                    {item.pickupTimings}
                  </p>
                  <div className="card-3">
                    <p className="card-3-price">₹{item.price}</p>
                    <button
                      className="btn-order"
                      onClick={() => handleBookNow(item)}
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No surprise bags found.</p>
          )}
        </div>
      </div>

      {modal && selectedBag && (
        <div className="modal">
          <div onClick={toggleModel} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-bag">
              <h2 className="modal-name">{selectedBag.name}</h2>
              <p className="modal-location">{selectedBag.location}</p>
              <p className="modal-category">
                <strong className="modal-cat">Category:</strong> {selectedBag.category}
              </p>
              <p className="modal-time">
                <strong className="modal-time-strong">Pickup Timings:</strong>{" "}
                {selectedBag.pickupTimings}
              </p>
              <div className="modal-transform">
                <div className="modal-possibleItems">
                  <p className="list-name">What's in the bag?</p>
                  <ul className="modal-list">
                    {selectedBag.possibleItems.map((item, index) => (
                      <li key={index} className="list-values">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="price-button">
                  <p className="modal-price">
                    <strong className="modal-price-strong">Price:</strong> ₹
                    {selectedBag.price}
                  </p>
                  <button
                    className="place-order"
                    onClick={() => handleUpdate(selectedBag._id)}
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="close-modal" onClick={toggleModel}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
