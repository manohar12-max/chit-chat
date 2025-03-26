import { Button } from "@/components/ui/button";
import { ChatState } from "@/Context/ChatProvider";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SingleUser from "./SingleUser";

const CreateGroupChatModal = ({ setShow }) => {
  const { chats, user,setChats } = ChatState();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [createGroupLoading, setCreateGroupLoading] = useState(false);
  const [groupMem, setGroupMem] = useState([]);

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

  const onCreateGroup = async () => {
    if (groupMem.length < 2 || !name) {
      console.log("Need a minimum of two members and Group Name");
      return;
    }

    try {
      setCreateGroupLoading(true); // ✅ Use state setter function
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
          "Content-Type": "application/json",
        },
      };

      const groupData = {
        chatName:name,
        users:JSON.stringify(groupMem.map((user)=> user._id))
      } // ✅ Wrap in object if API expects this format
      const { data } = await axios.post(
        `http://localhost:5000/api/chat/group`,
        groupData,
        config
      );
      setChats([data,...chats])  
      setShow(false)
    } catch (err) {
      console.error("Error creating group:", err.response?.data || err.message);
    } finally {
      setCreateGroupLoading(false); // ✅ Ensure loading state is reset
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
        <h1 className="text-white text-lg font-bold mb-2">Create Group Chat</h1>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Give name to your group chat"
          className="w-full p-2 mt-5 rounded-md border border-green-700 outline-none"
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Add users.."
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
                      setGroupMem((prevUsers) =>
                        prevUsers.filter((user) => user._id !== item._id)
                      );
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
                    onClick={() => addGroupMem(item)}
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

        {/* Create Button */}
        <Button
          onClick={onCreateGroup}
          className="cursor-pointer w-full mt-4 right-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupChatModal;
