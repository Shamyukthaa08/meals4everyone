import { useState, useEffect } from "react";
import { Navbar } from "../../Navbar/Navbar";
import axios from "axios";
import "./order.css";
import food from '../../../assets/food.jpg';

export default function Ordersurprise() {
  const [surpriseBag, setSurpriseBag] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBag, setSelectedBag] = useState(null); // State to hold the selected bag details

  const toggleModel = () => {
    setModal(!modal);
  }

  const getbags = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/getbags', {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      setSurpriseBag(response.data.bags); // Assuming your API returns an object with a "bags" array
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    getbags(); // Call the function when the component mounts
  }, []);

  const handleBookNow = (item) => {
    setSelectedBag(item); // Set the selected bag details
    toggleModel(); // Open the modal
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
                    <img src={food} alt="food" className="order-image" />
                  </div>
                </div>
                <div className="card-2">
                  <div className="orders-location">
                    <p className="card-1-name">{item.name}</p>
                    <p className="card-1-location">{item.location}</p>
                  </div>
                  <p className="card-1-category">{item.category}</p>
                  <p className="card-1-price">
                    <strong className="sub-time">Timings: </strong>{item.pickupTimings}
                  </p>
                  <div className="card-3">
                    <p className="card-3-price">₹{item.price}</p>
                    <button className="btn-order" onClick={() => handleBookNow(item)}>Book now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No surprise bags found.</p>
          )}
        </div>
      </div>
      {modal && selectedBag && ( // Ensure selectedBag is not null
        <div className="modal">
          <div onClick={toggleModel} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-bag">
              <h2 className="modal-name">{selectedBag.name}</h2>
              <p className="modal-location">{selectedBag.location}</p>
              <p className="modal-category"><strong className="modal-cat">Category:</strong> {selectedBag.category}</p>
              <p className="modal-time"><strong className="modal-time-strong">Pickup Timings:</strong> {selectedBag.pickupTimings}</p>
            <div className="modal-transform">
              <div className="modal-possibleItems">
              <p className="list-name">What's in the bag?</p> <ul className="modal-list">{ selectedBag.possibleItems.map((item, index)=><li key={index} className="list-values">{item}</li>)}</ul>
              </div>
              <div className="price-button">
              <p className="modal-price"><strong className="modal-price-strong">Price:</strong> ₹{selectedBag.price}</p>
              <button className="place-order">Confirm order</button>
              </div>
            </div>
            </div>
          </div>
          <button className="close-modal" onClick={toggleModel}>Close</button>
        </div>
      )}
    </div>
  );
}
