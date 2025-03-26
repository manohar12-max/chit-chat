import { ChatState } from "@/Context/ChatProvider";
import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import NavNotification from "./NavNotification";

const NavUser = () => {
  const { user } = ChatState(); // ✅ Destructure user from the ChatState
  const [show, setShow] = useState(false);
  if (!user || !user.pic) {
    return <div className="text-white">Loading...</div>; // Handle undefined user
  }

  return (
    <div className="flex items-center justify-center gap-2">
    <NavNotification/>
    <div className="rounded-full bg-green-700 w-[45px] h-[45px] p-0.5 cursor-pointer">
     
      <div className="rounded-full bg-green-700 w-full h-full overflow-hidden">
        <img
          onClick={() => {
            setShow(!show);
          }}
          className="w-full h-full object-cover"
          src={user.pic} // ✅ Now correctly accessing user.pic
          alt="profile-pic"
        />
      </div>
      {show && (
        <div 
        onClick={()=>{
            setShow(false);
           
  
        }}
        className="absolute top-0 left-0 w-full sm:w-[400px]  h-full bg-accent-foreground opacity-100 z-50">
          <div className="p-5 flex flex-col  text-white  py-5 h-full justify-between">
            <div className="">
                
              <h3 className="bg-green-200 py-2 px-4 font-bold text-xl rounded-xs text-green-950 flex gap-0.5 justify-between ">
              <Avatar
              pic={user?.pic} 
              />
                {user.name}
              </h3>
              <p>{user.email}</p>
            </div>
            <div className="">
              <h1 className="text-3xl font-bold uppercase text-green-600">
                Welcome to
              </h1>
              <h2 className="text-3xl font-bold uppercase text-green-600">
                CHIT-CHAT
              </h2>
            </div>
            <button
              onClick={() => {
                setShow(false);
                localStorage.removeItem("userInfo");
                window.location.href = "/login"; // Redirect to login page
              }}
              className="w-full text-white bg-green-500 py-2 rounded-3xl cursor-pointer"
            >
              
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default NavUser;
