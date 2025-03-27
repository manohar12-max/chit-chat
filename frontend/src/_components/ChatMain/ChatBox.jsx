import React from "react";
import SingleChat from "./SingleChat";
import { ChatState } from "@/Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className={`flex-1 bg-green-300 p-4 h-full rounded-xl ${
        isMobile && !selectedChat ? "hidden" : "block"
      }`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
