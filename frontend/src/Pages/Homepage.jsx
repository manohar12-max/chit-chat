import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("Homepage - User Info from localStorage:", userInfo);

    if (userInfo) {
      console.log("Redirecting to /chats");
      navigate("/chats");
    } else {
      console.log("Redirecting to /auth");
      navigate("/auth");
    }
  }, []);

  return <div>Home</div>;
};

export default Homepage;
