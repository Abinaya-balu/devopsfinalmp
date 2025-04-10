import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import notVerified from "../../assets/notVerified.jpg";

const HallForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus] = useState(false); 
  const [emailVerified, setEmailVerified] = useState(false);
  const [hallCreater, setHallCreater] = useState("");

  const [hallData, setHallData] = useState({
    name: "",       // Hall Name
    institution: "Kongu Engineering College", // Default institution
    capacity: "",   // Seating Capacity
    amenities: "",  // Available Amenities
    description: "", // Hall Description
    price: "",      // Booking Price
    location: ""    // Building/Block Location
  });

  const userContact = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getdata`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      const data = response.data;
      setHallCreater(data.email);

      if (data.emailVerified) {
        setEmailVerified(true);
      }

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while retrieving user data.");
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const CreateHall = async (e) => {
    e.preventDefault();
    const { name, institution, capacity, amenities, description, price, location } = hallData;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/halls`,
        { name, institution, capacity, amenities, description, price, location, hallCreater },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data) {
        toast.success("Hall Created Successfully!");
        navigate("/halls");
      } else {
        toast.error("Request not sent!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the hall.");
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
      ) : !emailVerified ? (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
          <div className="w-full lg:w-1/3">
            <img alt="error" className="hidden lg:block" src={notVerified} />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
              Looks Like You Have Not Verified Your Email!
            </h1>
            <p className="py-4 text-xl text-gray-800">
              Please click the button below and verify your email before proceeding.
            </p>
            <div>
              <Link to="/profile">
                <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Verify Email
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                Create Hall
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Create New <span className="text-indigo-600">Hall</span>
              </h3>
            </div>

            <form method="POST" className="w-full">
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Hall Name</label>
                <input
                  type="text"
                  name="name"
                  value={hallData.name}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Hall Name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Institution</label>
                <select
                  name="institution"
                  value={hallData.institution}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Kongu Engineering College">Kongu Engineering College</option>
                  <option value="Kongu Polytechnic College">Kongu Polytechnic College</option>
                  <option value="Kongu School of Architecture">Kongu School of Architecture</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={hallData.location}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Building/Block Location (e.g., Main Block, B-Block, etc.)"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Seating Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={hallData.capacity}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Maximum Seating Capacity"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Available Amenities</label>
                <input
                  type="text"
                  name="amenities"
                  value={hallData.amenities}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="E.g., Projector, Audio System, Air Conditioning"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Hall Description</label>
                <textarea
                  name="description"
                  value={hallData.description}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Hall Description"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Booking Price</label>
                <input
                  type="text"
                  name="price"
                  value={hallData.price}
                  onChange={handleInputs}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Booking Price (₹)"
                />
              </div>

              <button onClick={CreateHall} className="bg-indigo-600 text-white px-6 py-2 rounded">
                Create Hall
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HallForm;
