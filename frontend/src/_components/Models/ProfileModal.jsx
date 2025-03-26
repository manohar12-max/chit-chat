import { Button } from "@/components/ui/button";
import React from "react";

const ProfileModal = ({setShow,user}) => {

  return (
    <div className="absolute inset-0 bg-green-800/50 flex justify-center items-center">
      <div className="w-full h-auto sm:w-[50%] md:w-[33%] bg-green-500 p-4 rounded-lg shadow-lg relative text-center">
        {/* Close Button */}
        <Button
        onClick={()=>{setShow(false)} }
         className="absolute top-2 right-2 text-white text-lg font-bold bg-green-700 hover:bg-green-900 w-8 h-8 rounded-full flex justify-center items-center">
          x
        </Button>

        {/* User Name */}
        <h2 className="text-xl font-semibold text-white">{user?.name}</h2>

        {/* Profile Picture */}
        <div className="flex justify-center my-4">
          <img 
          src={user.pic}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4  border-white shadow-md" />

        </div>

        {/* Email */}
        <p className="text-white text-sm">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;
