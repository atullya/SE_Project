import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { UserContextProvider } from "../../ContextApi/UserContext";
import { BASE_URL } from "../../App";
import axios from "axios";

const AuthHome = () => {
  const [userdata, setuserdata] = useState(null); // Store user data or null if no user
  const navigate = useNavigate(); // To redirect to login if needed

  // Fetch user details from API
  const welcomeUser = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/api/blog/welcome`, {
        withCredentials: true, // Include credentials (cookies)
      });

      if (res.status === 200) {
        setuserdata(res.data.user); // Set user data if JWT is valid
      } else {
        console.error("Unexpected status:", res.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle Unauthorized error (JWT not valid or missing)
        // navigate("/authhome");
        navigate("/authhome");
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    welcomeUser();
  }, []); // Fetch user details on component mount

  return (
    <>
      {userdata ? (
        <p className="text-center text-3xl mt-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-700 to-red-700">
          Welcome, {userdata.username}
        </p>
      ) : (
        <p>Loading user data...</p>
      )}
      <UserContextProvider>
        <div className="flex fixed top-5">
          <div className="">
            <SideBar userdata={userdata} />
            {/* <h1 className="text-2xl font-bold mb-4">AuthHome</h1> */}
          </div>
        </div>
      </UserContextProvider>
    </>
  );
};

export default AuthHome;
