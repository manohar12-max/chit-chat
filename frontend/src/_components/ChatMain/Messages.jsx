import { ChatState } from "@/Context/ChatProvider";
import { getGroupUserName, isSameSenderMargin } from "@/folder/ChatLogics";

import ScrollableFeed from "react-scrollable-feed";

const Messages = ({ messages }) => {
  const { user, selectedChat } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            key={m._id}
            className={`flex items-center mb-2 ${
              m.sender._id === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`px-4 py-2 rounded-lg max-w-[60%] flex flex-col items-start  text-sm ${
                m.sender._id === user._id
                  ? "bg-green-300 text-black"
                  : "bg-amber-300 text-black"
              }`}
            >
              <span className="text-[10px]">
                {selectedChat?.isGroupChat &&    m.sender._id != user._id && (
                  <>
                    <span className="text-blue-700">From:</span>
                    {getGroupUserName(m.sender._id, selectedChat)}
                  </>
                )}
              </span>
              <span className="font-bold"> {m.content}</span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default Messages;
