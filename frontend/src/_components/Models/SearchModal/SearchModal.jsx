import { ChatState } from "@/Context/ChatProvider";
import axios from "axios";
import {
  ArrowBigRight,
  Loader,
  LoaderCircleIcon,
  LoaderPinwheel,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import Avatar from "../../Avatar/Avatar";
import SingleUser from "./SingleUser";

const SearchModal = ({ setShow }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleSearch = useCallback(async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
        },
      };

      const { data } = await axios.get(
        `https://chit-chat-1-t3my.onrender.com/api/user?search=${search}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, [search, user.token]);

  const accessChat = async (userId) => {
    try {
      setChatLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Fixed Authorization header
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `hhttps://chit-chat-1-t3my.onrender.com/api/chat`,
        { userId },
        config
      );
      if (!chats.find((c) => c._id == data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setChatLoading(false);
      setShow(false);
    } catch (error) {
      console.error("Error accessing chat:", error);
    }
  };

  return (
    <div className="mx-4 mt-4">
      <h1 className="text-2xl font-bold mb-2">Search a Friend</h1>
      <div className="flex justify-between gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full max-w-lg px-4 py-2 rounded-full bg-green-200 text-green-900 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-full p-2 bg-green-600 hover:bg-green-700 transition duration-300"
        >
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <ArrowBigRight />
          )}
        </button>
      </div>

      {/* Show Search Results */}
      {loading ? (
        <div className="mt-4 bg-white p-2 rounded-lg shadow-md flex items-center justify-center ">
          <h1 className="p-0.5 sm:p-2 border-b last:border-none text-green-300 ">
            <LoaderPinwheel className="mt-4 animate-spin" />
          </h1>
        </div>
      ) : (
        <>
          {searchResult.length > 0 ? (
            chatLoading ? (
              <div className="mt-4 bg-white p-2 rounded-lg shadow-md flex items-center justify-center ">
                <h1 className="p-0.5 sm:p-2 border-b last:border-none text-green-300 ">
                  <LoaderPinwheel className="mt-4 animate-spin" />
                </h1>
              </div>
            ) : (
              <ul className="mt-4 bg-white p-2 rounded-lg shadow-md ">
                {searchResult.map((item) => (
                  <li
                    onClick={() => {
                      accessChat(item._id);
                    }}
                    key={item._id}
                    className="p-0.5 sm:p-2 border-b last:border-none text-green-700 flex gap-2 items-center justify-between hover:text-white hover:bg-green-700 cursor-pointer rounded-lg "
                  >
                    <SingleUser item={item} />
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="mt-4 bg-white p-2 rounded-lg shadow-md ">
              <h1 className="p-0.5 sm:p-2 border-b last:border-none text-green-300  text-center">
                No users found. Please try again.
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchModal;
