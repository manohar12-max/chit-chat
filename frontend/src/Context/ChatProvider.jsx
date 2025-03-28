import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
indexedDB;
const ChatContext = createContext(); // we will create context

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const remainingTimeInSeconds = exp - currentTime;
    const remainingTimeInMinutes = Math.floor(remainingTimeInSeconds / 60);
    console.log(`Token expires in ${remainingTimeInMinutes} minutes`);
    return Date.now() >= exp * 1000;
  };
  useEffect(() => {
    const checkTokenExpiry = () => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        if (isTokenExpired(token)) {
          localStorage.removeItem("userInfo");
          window.location.href = "/auth"; // Redirect to login page
        }
      }
    };

    checkTokenExpiry(); // Check on mount

    // Set interval to check every 5 minute
    const interval = setInterval(checkTokenExpiry, 3000000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    } else {
      setUser(null);
      navigate("/auth");
    }
  }, [navigate]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
