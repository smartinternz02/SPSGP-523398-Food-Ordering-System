import React, { useState, useEffect } from "react";
import loginsignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (email && password) {
      const url = 'http://localhost:8080/api/auth/signin';

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.text();
          setResponseMessage(responseData);
          setShowPopup(true);
          // Handle successful signup if needed
        } else {
          setResponseMessage("Login failed");
          // Handle failed signup if needed
        }
      } catch (error) {
        console.log('Error:', error);
        // Handle any network or fetch API errors
      }
    } else {
      alert("Please enter the required fields.");
    }
  };

  useEffect(() => {
    if (showPopup) {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, []);

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '10rem', // Increase the padding value
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email </label>
          <input
            type="text"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password </label>
          <div className="flex bg-slate-200 px-2 py-1 rounded mt-1 mb-2 outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none px-2 py-1 rounded"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="max-w-[150px] w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Log in
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Signup
          </Link>
        </p>
        {showPopup && (
          <div style={popupStyle}>
            {responseMessage && <p>{responseMessage}</p>}
            <p>Redirecting to the home page...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
