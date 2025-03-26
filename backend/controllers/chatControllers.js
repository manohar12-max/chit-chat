const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const accessChat = async (req, res) => {
  const { userId } = req.body; // check if chat with this user Id exist
  if (!userId) {
    console.log("UserId param not sent the request");
    return res.status(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, // search in array
      { users: { $elemMatch: { $eq: userId } } }, // both of the users id should be in array then only chat exists
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage"); // populating latestMeassage it will only populate objectId of latest meassage but not all the conatens
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    return res.json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
};

const fetchChats = async (req, res) => {
  // console.log(req.user._id);
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    throw new Error(error.message);
  }
};

const createGroupChat = async (req, res) => {
  var { users, chatName } = req.body;
  if (!users || !chatName) {
    console.log("User or chatName not sent in the request");
    return res.status(400).res.send({ message: "Please Fill all the fields" });
  }
  var users = JSON.parse(users);
  if (users.length < 2) {
    return res
      .status(400)
      .res.send({ message: "Group chat should have at least two users" });
  }
  try {
    var groupChat = await Chat.create({
      chatName: chatName,
      isGroupChat: true,
      users: [...users, req.user._id],
      groupAdmin: req.user._id, // beacause user will crate the group
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
};
const renameGroup = async (req, res) => {
  const { chatId, newChatName } = req.body;
  if (!chatId || !newChatName) {
    console.log("ChatId or newChatName not sent in the request");
    return res.status(400).res.send({ message: "Please Fill all the fields" });
  }
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName: newChatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if(!chat){
    return res.status(404).send({ message: "Chat not found" });
  }else{
    res.status(200).json(chat);
  }
};

const addToGroup = async (req, res) => {
  const {chatId,userId}=req.body;
  if (!chatId ||!userId) {
    console.log("ChatId or userId not sent in the request");
    return res.status(400).res.send({ message: "Please Fill all the fields" });
  }
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  ).populate("users", "-password")
  .populate("groupAdmin", "-password");
  if(!chat) {
    return res.status(404).send({ message: "Chat not found" });
  }
  res.status(200).json(chat);
}
const removeFromGroup = async (req, res) => {
  const {chatId, userId}=req.body;
  if (!chatId ||!userId) {
    console.log("ChatId or userId not sent in the request");
    return res.status(400).res.send({ message: "Please Fill all the fields" });
  }
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  ).populate("users", "-password")
  .populate("groupAdmin", "-password");
  if(!chat) {
    return res.status(404).send({ message: "Chat not found" });
  }
  res.status(200).json(chat);
}

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup,addToGroup,removeFromGroup };
