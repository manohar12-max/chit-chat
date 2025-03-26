import ChatBox from "@/_components/ChatMain/ChatBox";
import MyChats from "@/_components/ChatMain/MyChats";

import NavMain from "@/_components/Navbar/NavMain";
import { ChatState } from "@/Context/ChatProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain,setFetchAgain]=useState(false)
  return (
    <div className="h-screen overflow-hidden">
      <NavMain />
      <div className="flex h-full gap-2.5 p-4 pb-18 ">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />}
      </div>
    </div>
  );
};

export default Chatpage;
