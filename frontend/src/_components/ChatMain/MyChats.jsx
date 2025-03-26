import { Button } from "@/components/ui/button";
import { ChatState } from "@/Context/ChatProvider";
import { getSender } from "@/folder/ChatLogics";
import axios from "axios";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect, useState } from "react";

import CreateGroupChatModal from "../Models/GroupChat/CreateGroupChatModal";

const MyChats = ({fetchAgain}) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
   
  const fetchAllChats = async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`http://localhost:5000/api/chat`, config);
      setChats(data);
    } catch (error) {
      console.error("Error accessing chat:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
    fetchAllChats();
  }, [fetchAgain]); // Run only when `user` changes
  
  return (
    <div className="w-5/12 bg-green-300 p-4 h-full rounded-xl">
      <div className="flex justify-between px-2 mb-2">
        <h1 className="text-green-700 text-2xl"> Chats</h1>
        <Button
          onClick={() => setShow(true)}
          className="bg-green-800 flex cursor-pointer items-center justify-center gap-1"
        >
          <span className="hidden md:block">Add new group</span>
          <span className="md:text-xl text-4xl">+</span>
        </Button>
      </div>

      <div className="flex flex-col p-2 w-full h-[90%] overflow-y-auto bg-green-400 rounded-2xl">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoaderPinwheel className="animate-spin text-green-800" />
          </div>
        ) : chats?.length > 0  ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-2 mb-0.5 cursor-pointer flex justify-between rounded-br-4xl ${
                selectedChat?._id === chat._id ? "bg-green-800 text-white" : "bg-white text-black"
              }`}
            >
              <p className="font-bold">
                {!chat.isGroupChat ? getSender(loggedUser, chat.users || []) : chat.chatName}
              </p>
              <p>.</p>
            </div>
          ))
        ) : (
          <div className="mt-4 bg-white p-2 rounded-lg shadow-md flex items-center justify-center">
            <h1 className="p-0.5 sm:p-2 border-b last:border-none text-green-700">
              No Chats found. Start a new conversation!
            </h1>
          </div>
        )}
      </div>

      {show && <CreateGroupChatModal setShow={setShow} />}
    </div>
  );
};

export default MyChats;
