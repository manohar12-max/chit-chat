import Avatar from "@/_components/Avatar/Avatar";
import React from "react";

const SingleUser = ({item}) => {
  return (
    <>
      <Avatar pic={item.pic} />
      <span className="font-extrabold text-xl sm:text-sm "> {item.name}</span>
      <span className="hidden md:block">{item.email}</span>
    </>
  );
};

export default SingleUser;
