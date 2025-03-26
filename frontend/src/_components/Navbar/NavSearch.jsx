import { Search } from "lucide-react";
import React, { useState } from "react";
import SearchModal from "../Models/SearchModal/SearchModal";

const NavSearch = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="mx-4 rounded-2xl text-center ">
      <button
        onClick={() => setShow(true)}
        className=" max-w-lg px-10 sm:px-14 py-2 rounded-full bg-green-200 text-green-900 cursor-pointer flex justify-center items-center gap-2 "
      >
        <Search className="h-4" />{" "}
        <span className="hidden md:block"> Search for a friend...</span>{" "}
        <span className="block md:hidden">Search</span>
      </button>

      {show && (
        <div
          className="absolute top-0 left-0 w-full sm:w-[400px]  h-full bg-accent-foreground opacity-100 z-50 "
        >
          <div className="relative">
          <div className="p-5 flex flex-col  text-white  py-5 h-full justify-between">
            <SearchModal show={show} setShow={setShow} />
          </div>
          <button
            onClick={() => setShow(false)}
            className="absolute top-1 right-4  text-white cursor-pointer text-xl"
          >x</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearch;
