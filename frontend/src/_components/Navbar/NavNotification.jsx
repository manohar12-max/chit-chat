import { ChatState } from "@/Context/ChatProvider";
import { getSender } from "@/folder/ChatLogics";
import { BellRingIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
let t
const NavNotification = () => {
  const { notifications, setNotifications, user, setSelectedChat } =
    ChatState();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <div className="cursor-pointer relative"
       onClick={() => {
        setShow(!show);
        clearTimeout(t);
        t=setTimeout(()=>{
          setShow(false);
        },2000)
       }}>
        <BellRingIcon className="w-6 h-6 text-white" />
        {notifications.length > 0 && (
          <div className="absolute right-[-3px] top-[-5px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
            {notifications.length}
          </div>
        )}
      </div>

      {/* Notification Dropdown */}
      {show && (
        <div className="absolute top-10 right-0 w-56 bg-green-700 text-white shadow-lg rounded-lg z-50">
          <ul className="p-2 space-y-2">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <li
                  key={item._id}
                  onClick={() => {
                    setShow(false);
                    setSelectedChat(item.chat);
                    setNotifications(notifications.filter((n) =>{
                        console.log(n,item)
                        return n.sender._id!== item.sender._id;
                    }));
                  }}
                  className="p-2 bg-green-600 rounded-lg hover:bg-green-500 cursor-pointer text-sm"
                >
                  {item.chat.isGroupChat
                    ? `New message in ${item.chat.chatName}`
                    : `New message from ${getSender(user, item.chat.users)}`}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-300">No new messages</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavNotification;
