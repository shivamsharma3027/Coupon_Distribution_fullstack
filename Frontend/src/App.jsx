import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0); // Timer state
  const [showManualForm, setShowManualForm] = useState(false); // Manual form state
  const [userInput, setUserInput] = useState({ ip: "", cookie: "" }); // Manual input state
  const timerRef = useRef(null); // Ref to store the timer ID

  // Handle input change for manual form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle manual form submission
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    await claimCoupon(userInput.ip, userInput.cookie);
  };

  // Claim Coupon function
  const claimCoupon = async (customIP = "", customCookie = "") => {
    try {
      const ip = customIP || (await axios.get("https://api.ipify.org?format=json")).data.ip; // Use custom IP or fetch automatically
      const cookie = customCookie || document.cookie || "default_cookie"; // Use custom cookie or default

      const payload = { ip, cookie };
      

      const response = await axios.post("http://localhost:5000/api/claim", payload);

      if (response.data.timeRemaining) {
        // If remaining time is sent by the backend
        setMessage(response.data.message);
        startTimer(response.data.timeRemaining); // Start the timer
      } else {
        setMessage(response.data.message);
        setCoupon(response.data.coupon || "");
        setTimeRemaining(0); // Reset timer if no time remaining
      }
    } catch (error) {
      
      if (error.response?.data?.timeRemaining) {
        setMessage(error.response.data.message);
        startTimer(error.response.data.timeRemaining); // Start the timer
      } else {
        setMessage(error.response?.data?.message || "An error occurred.");
        setTimeRemaining(0); // Reset timer on error
      }
    }
  };

  // Start the timer
  const startTimer = (timeRemaining) => {
    // Clear the previous timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set the remaining time
    setTimeRemaining(timeRemaining);

    // Start a new timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(timerRef.current); // Stop the timer when time is up
          return 0;
        }
        return prevTime - 1000; // Decrease time by 1 second
      });
    }, 1000);
  };

  // Format time (convert milliseconds to minutes and seconds)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // Clear the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          🎟️ Coupon Distribution
        </h1>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => claimCoupon()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Claim Coupon (Auto IP & Cookie)
          </button>

          <button
            onClick={() => setShowManualForm(!showManualForm)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {showManualForm ? "Hide Manual Entry" : "Enter IP & Cookie Manually"}
          </button>
        </div>

        {showManualForm && (
          <form onSubmit={handleManualSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-gray-700 font-medium">Enter IP:</label>
              <input
                type="text"
                name="ip"
                value={userInput.ip}
                onChange={handleInputChange}
                placeholder="Enter custom IP"
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Enter Cookie:</label>
              <input
                type="text"
                name="cookie"
                value={userInput.cookie}
                onChange={handleInputChange}
                placeholder="Enter custom cookie"
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Claim with Manual Data
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          {message && <p className="text-lg font-medium text-gray-800">{message}</p>}
          {coupon && (
            <p className="mt-2 text-lg font-semibold text-green-600 bg-green-100 py-2 px-4 rounded-lg">
              🎉 Your Coupon: {coupon}
            </p>
          )}
          {timeRemaining > 0 && (
            <p className="mt-2 text-red-600 font-semibold">
              ⏳ Next claim available in: {formatTime(timeRemaining)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;