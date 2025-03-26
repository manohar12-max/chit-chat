import { Button } from "@/components/ui/button";
import { ChatState } from "@/Context/ChatProvider";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SingleUser from "./SingleUser";

const UpdateGroupChatModal = ({ setShow, fetchAgain, setFetchAgain,fetchMessages }) => {
  const { chats, user, setChats, selectedChat, setSelectedChat } = ChatState();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState(selectedChat.chatName);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [groupMem, setGroupMem] = useState(selectedChat.users);

  const handleSearch = useCallback(
    async (search) => {
      if (!search.trim()) {
        setSearchResult([]);
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
          },
        };

        const { data } = await axios.get(
          `http://localhost:5000/api/user?search=${search}`,
          config
        );
        setSearchResult(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    [search, user.token]
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch(search);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search, handleSearch]);

  const addGroupMem = (newUser) => {
    setGroupMem((prevUsers) => {
      if (prevUsers.some((user) => user._id === newUser._id)) return prevUsers;
      return [...prevUsers, newUser];
    });
  };

  
  const handleRename = async () => {
    try {
      setRenameLoading(true); // ✅ Use state setter function
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        { chatId: selectedChat._id, newChatName: name },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain); // Assuming setFetchAgain triggers re-fetching data
    } catch (err) {
      console.error("Error renaming group:", err.response?.data || err.message);
    } finally {
      setRenameLoading(false); // ✅ Ensure loading state is reset
    }
  };
  const handleAddToGroup = async (userId) => {
    try {
      setRenameLoading(true); // ✅ Use state setter function
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupAdd`,
        { chatId: selectedChat._id, userId: userId },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain); // Assuming setFetchAgain triggers re-fetching data
      setShow(false);
    } catch (err) {
      console.error("Error renaming group:", err.response?.data || err.message);
    } finally {
      setRenameLoading(false); // ✅ Ensure loading state is reset
    }
  };
  const handleRemoveFromGroup = async (userId) => {
    try {
      setRenameLoading(true); // ✅ Use state setter function
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupRemove`,
        { chatId: selectedChat._id, userId: userId },
        config
      );
      userId==user._id ? setSelectedChat(null): setSelectedChat(data)
      
      setFetchAgain(!fetchAgain); // Assuming setFetchAgain triggers re-fetching data
      fetchMessages()
      setShow(false);
    } catch (err) {
      console.error("Error renaming group:", err.response?.data || err.message);
    } finally {
      setRenameLoading(false); // ✅ Ensure loading state is reset
    }
  };
  return (
    <div className="absolute inset-0 bg-green-800/50 flex justify-center items-center ">
      <div className="w-full h-auto sm:w-[50%]  md:w-[33%]  bg-green-500 p-4 rounded-lg shadow-lg relative ">
        {/* Close Button */}
        <Button
          size="sm"
          variant="text"
          className=" cursor-pointer absolute top-2 right-3 text-white text-xl font-bold"
          onClick={() => setShow(false)} // Assuming setShow controls modal visibility
        >
          x
        </Button>

        {/* Modal Content */}
        <h1 className="text-white text-lg font-bold mb-2">Update Group Chat</h1>
        <div className="flex gap-1 justify-between items-center mt-5">
          <input
            onClick={() => {}}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Give name to your group chat"
            className="w-full p-2  rounded-md border border-green-700 outline-none"
          />
          <Button
            disabled={loading}
            onClick={handleRename}
            className={
              "cursor-pointer  right-4 bg-green-700 text-white rounded-md hover:bg-green-800 transition text-sm"
            }
          >
            {renameLoading ? "Loading..." : "Rename"}
          </Button>
        </div>

        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Add new friend..."
          className="w-full p-2 mt-5 rounded-md border border-green-700 outline-none"
        />
        {groupMem.length > 0 && (
          <div className="w-full overflow-x-scroll custom-scrollbar py-2">
            <ul className="flex gap-1 mt-1 ">
              {groupMem.map((item) => (
                <li
                  key={item._id}
                  className=" text-xs text-white p-1.5 pr-4 rounded-xl bg-green-700 relative "
                >
                  {item.name}{" "}
                  <span
                    onClick={() => {
                      handleRemoveFromGroup(item._id);
                    }}
                    className="absolute right-0 top-0 pr-1 cursor-pointer "
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="">
          {loading && (
            <div className="text-white text-center text-xl">Loading...</div>
          )}
          {searchResult.length > 0 && (
            <div className="mt-4">
              <ul>
                {searchResult.map((item) => (
                  <li
                    onClick={() => handleAddToGroup(item._id)}
                    key={item._id}
                    className="mt-2 cursor-pointer"
                  >
                    <SingleUser user={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cancel Button */}
        </div>

        {/*Leave Group Button */}
        <Button
          onClick={() => handleRemoveFromGroup(user._id)}
          size="sm"
          variant="text"
          className="cursor-pointer mt-5 bg-white text-green-700 rounded-md hover:bg-green-800 transition text-sm"
        >
          Leave Group
        </Button>
      </div>
    </div>
  );
};

export default UpdateGroupChatModal;
