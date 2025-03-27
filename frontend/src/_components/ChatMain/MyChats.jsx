import { Button } from "@/components/ui/button";
import { ChatState } from "@/Context/ChatProvider";
import { getSender } from "@/folder/ChatLogics";
import axios from "axios";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect, useState } from "react";

import CreateGroupChatModal from "../Models/GroupChat/CreateGroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fetchAllChats = async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `https://chit-chat-1-t3my.onrender.com/api/chat`,
        config
      );
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

    // Detect screen width
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchAgain]);

  return (
    <div
      className={`md:w-5/12 w-full bg-green-300 p-4 h-full rounded-xl ${
        isMobile && selectedChat ? "hidden" : "block"
      }`}
    >
      <div className="flex justify-between px-2 mb-2">
        <h1 className="text-green-700 text-xl md:text-2xl">Chats</h1>
        <Button
          onClick={() => setShow(true)}
          className="bg-green-800 flex items-center justify-center gap-1"
        >
          <span className="hidden md:block">Add new group</span>
          <span className="text-xl md:text-2xl">+</span>
        </Button>
      </div>

      <div className="flex flex-col p-2 w-full h-[90%] overflow-y-auto bg-green-400 rounded-2xl">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoaderPinwheel className="animate-spin text-green-800" />
          </div>
        ) : chats?.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-2 mb-0.5 cursor-pointer flex justify-between rounded-br-4xl ${
                selectedChat?._id === chat._id
                  ? "bg-green-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              <p className="font-bold">
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users || [])
                  : chat.chatName}
              </p>
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
