export const getSender = (loggedUser, users) => {
  if (!users || users.length != 2) {
    return; // Prevents errors
  }
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  if (!users || users.length != 2) {
    return; // Prevents errors
  }
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
export const getSenderName = (loggedUser, users) => {
   if (!users || users.length != 2) {
     return; // Prevents errors
   }
   return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
 };

export const getGroupUserName=(senderId,selectedChat)=>{

   if(selectedChat?.isGroupChat){
    let result= selectedChat?.users.find(user=>user._id===senderId )
    return result?.name;
  }else{
   return
  }
}

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
