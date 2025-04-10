import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const HallsEdit = () => {
  const navigate = useNavigate();
  const { hallId } = useParams();
  const [hallData, setHallData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus] = useState(false); 
  const getHallsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/halls/${hallId}`, {
        withCredentials: true,
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      });

      setHallData(response.data.hall);
      setIsLoading(false);
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getHallsData();
  }, []);

  const UpdateHallForm = async (e) => {
    e.preventDefault();
    const { name, capacity, amenities, description, price } = hallData;

    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/halls/${hallId}`, {
        name,
        capacity,
        amenities,
        description,
        price
      });

      toast.success("Slot Updated Successfully!");
      navigate("/halls");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the slot.");
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHallData({ ...hallData, [name]: value });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center">
            Update <span className="text-indigo-600">Slot</span>
          </h3>

          <form onSubmit={UpdateHallForm} className="w-full">
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Slot Title</label>
              <input
                type="text"
                name="name"
                value={hallData.name}
                onChange={handleInputs}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Slot Name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Available Slots</label>
              <input
                type="number"
                name="capacity"
                value={hallData.capacity}
                onChange={handleInputs}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Number of Slots Available"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Included Services</label>
              <input
                type="text"
                name="amenities"
                value={hallData.amenities}
                onChange={handleInputs}
                className="w-full px-3 py-2 border rounded"
                placeholder="E.g., Seed Cleaning, Packaging"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Operating Hours</label>
              <input
                type="text"
                name="description"
                value={hallData.description}
                onChange={handleInputs}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Slot Timing (e.g., 9 AM - 12 PM)"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Price Per Slot</label>
              <input
                type="text"
                name="price"
                value={hallData.price}
                onChange={handleInputs}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Cost Per Slot"
              />
            </div>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded">
              Update Slot
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default HallsEdit;
