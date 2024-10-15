import { useState, useEffect } from "react";
import axios from "axios";  // Import Axios

import { handleError, handleSuccess } from '../../Registration/util';
import { ToastContainer } from "react-toastify";

import './surprise.css';
import womenwithbag from "../../../assets/womenwithbag.jpg";

function Surprisebag() {
  const [tasks, setTasks] = useState([]); // Stores the possible items
  const [newTask, setNewTask] = useState(""); // Current task input
  const [category, setCategory] = useState("All"); // Selected category
  const [pickupTiming, setPickupTiming] = useState("10.00 am - 12.00 pm"); // Selected timing
  const [numberOfBags, setNumberOfBags] = useState(1); // Number of bags
  const [price, setPrice] = useState(""); // Price of the bag
  const [name, setName] = useState(""); // Name from localStorage
  const [location, setLocation] = useState(""); // Location from localStorage

  // Fetch name and location from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("loggedInUser") || "";
    const storedLocation = localStorage.getItem("city") || "";
    setName(storedName);
    setLocation(storedLocation);
  }, []);

  // Handle input changes
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Add a new item to the tasks list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  // Delete an item from the tasks list
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Handle form submission and send data to backend
  async function handleSubmit() {
    const data = {
      name,
      location,
      category,
      possibleItems: tasks,
      pickupTimings: [pickupTiming],
      numberOfBags,
      price: parseFloat(price),
    };

    try {
      await axios.post("http://localhost:8080/admin/surprisebag", data);
      handleSuccess("Surprise bag created successfully!");
    } catch (error) {
      console.error("Error creating surprise bag:", error);
      handleError("Failed to create the surprise bag.");
    }
  }

  return (
    <div className="SurpriseBag">
      <div className="women-image">
        <img src={womenwithbag} alt="women with bag" width="500px" height="690px" />
      </div>

      <div className="createSurpriseBag">
      <ToastContainer/>
        <h2 className="surprise-title">CREATE YOUR BAG OF SURPRISE!</h2>

        <div className="select-option">
          <div>
            <p className="select-para">Select the category: </p>
            <select className="select-category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              <option>Grocery</option>
              <option>Bread & Pasteries</option>
              <option>Ready to eat</option>
              <option>Snacks</option>
              <option>Pulses, Rice & Oil</option>
            </select>
          </div>

          <div className="price-input">
            <p className="select-para">Price of bag:</p>
            <label htmlFor="price">Rs.
              <input
                type="number"
                min="0"
                placeholder="Enter the price of bag"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="price"
              />
            </label>
          </div>
        </div>

        <div className="Item-List">
          <div className="Input-item">
            <p className="item-title">Enter the possible items in the bag:</p>
            <input
              type="text"
              placeholder="Enter item..."
              className="item-input"
              value={newTask}
              onChange={handleInputChange}
            />
            <button className="Add-btn" onClick={addTask}>Add</button>
          </div>

          <ol className="item-list">
            {tasks.map((element, index) => (
              <li className="item-list" key={index}>
                <div className="items-btn">
                  <div className="items-added">
                    <span className="text">{element}</span>
                  </div>
                  <button className="delete-button" onClick={() => deleteTask(index)}>Del</button>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="select-option">
          <div>
            <p className="select-para">Select the pickup timing: </p>
            <select
              className="select-category"
              value={pickupTiming}
              onChange={(e) => setPickupTiming(e.target.value)}
            >
              <option>10.00 am - 12.00 pm</option>
              <option>3.00 pm - 5.00 pm</option>
              <option>6.00 pm - 9.00 pm</option>
            </select>
          </div>

          <div className="price-input">
            <p className="select-para">Number of bags:</p>
            <label htmlFor="numberOfBags">
              <input
                type="number"
                min="1"
                value={numberOfBags}
                onChange={(e) => setNumberOfBags(e.target.value)}
                className="price"
              />
            </label>
          </div>
        </div>

        <div className="submit">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Surprisebag;
