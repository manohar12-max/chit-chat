const mongoose = require("mongoose");
const chatModel = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId, //id of user
      ref: "User", //reference to usermodel
    },
  ], //a single user will have two, user group will have multiple
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId, //id of
    ref: "Message", //reference to message model
  },
  groupAdmin: { type:mongoose.Schema.Types.ObjectId, ref:"User" },
},
{
    timestamps: true, // automatically add createdAt and updatedAt fields
}
);
const Chat = mongoose.model('Chat',chatModel);
module.exports =Chat