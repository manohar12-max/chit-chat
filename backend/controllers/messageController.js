const Chat = require("../models/chatModel");
const Message = require("../models/messageModal");
const User = require("../models/userModel");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  var newMessage = {
    content,
    sender: req.user._id,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await  Chat.findByIdAndUpdate(chatId,{
        latestMessage: message
    })
    res.json(message);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
};
const allMessages=async(req,res)=>{
 const {chatId} = req.params
try{
   const messages=await Message.find({chat:chatId}).populate("sender" ,"name pic email").populate("chat")
   res.json(messages)
}catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  
}
}
module.exports={sendMessage,allMessages}