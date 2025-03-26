import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    } else {
    
      navigate("/login");
    }
  }, [navigate]);
  return <div>Home</div>;
};

export default Homepage;
