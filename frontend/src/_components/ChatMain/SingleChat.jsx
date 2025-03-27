import React, { useEffect, useState } from "react";
import UpdateGroupChatModal from "../Models/GroupChat/UpdateGroupChatModal";
import { Eye, Loader, LoaderCircle, Settings } from "lucide-react";
import { ChatState } from "@/Context/ChatProvider";
import ProfileModal from "../Models/ProfileModal";
import { getSenderFull, getSenderName } from "@/folder/ChatLogics";
import axios from "axios";
import Messages from "./Messages";
import UserInfo from "./UserInfo";
import { io } from "socket.io-client";
const EndPoint = "https://chit-chat-1-t3my.onrender.com";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat ,notifications,setNotifications} = ChatState();
  const [showGroup, setShowGroup] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const sendMessage = async (e) => {
    if (e.key == "Enter" && text.trim() != "") {
      try {
        setText("");
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
          "Content-Type": "application/json",
        };
        const { data } = await axios.post(
          `https://chit-chat-1-t3my.onrender.com/api/message`,
          { content: text, chatId: selectedChat._id },
          config
        );
        socket.emit('new message',data)
        setMessages([...messages, data]);
        
      } catch (err) {
        console.log(err);
      }
    }
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `https://chit-chat-1-t3my.onrender.com/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket = io(EndPoint); // connect to server
    socket.emit("setup", user); // create room with server 
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);



  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id != newMessageReceived.chat._id
      ) {
        if(!notifications.includes(newMessageReceived)){
          setNotifications([ newMessageReceived,...notifications])
          setFetchAgain(!fetchAgain); 
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return selectedChat ? (
    <>
      <div className="flex justify-between px-2">
        <h2 className="text-2xl font-bold text-gray-700">
          {selectedChat?.isGroupChat ? (
            selectedChat.chatName
          ) : (
            <UserInfo user={user} selectedChat={selectedChat} />
          )}
        </h2>
        {selectedChat?.isGroupChat ? (
          <Settings
            onClick={() => setShowGroup(true)}
            className="cursor-pointer"
          />
        ) : (
          <Eye onClick={() => setShow(true)} className="cursor-pointer" />
        )}
      </div>
      <div className="flex flex-col mt-2 p-2 w-full h-[85%] overflow-y-auto bg-green-400 rounded-t-2xl">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center ">
            <LoaderCircle size="50" className="text-green-900 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col overflow-y-auto  scroll-m-1 ">
            <Messages messages={messages} />
          </div>
        )}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={sendMessage} // Move onKeyDown here
        type="text"
        placeholder="Type..."
        className="w-full self-baseline border-2 border-white rounded-b-2xl px-4 py-1 focus:border-none"
      />

      {showGroup && (
        <UpdateGroupChatModal
          setShow={setShowGroup}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          fetchMessages={fetchMessages}
        />
      )}
      {show && (
        <ProfileModal
          setShow={setShow}
          user={getSenderFull(user, selectedChat.users)}
        />
      )}
    </>
  ) : (
    <div className="flex-1 bg-green-300 p-4 h-full rounded-xl">
      <div className="flex justify-between px-2">
        <h2 className="text-2xl font-bold text-gray-700">
          Select a chat to view messages
        </h2>
      </div>
      <div className="flex flex-col mt-2 p-2 w-full h-[90%] overflow-y-auto bg-green-400 rounded-2xl items-center justify-center">
        <h1>Let's make buddies to</h1>
        <h1>Chit-Chat</h1>
      </div>
    </div>
  );
};

export default SingleChat;
