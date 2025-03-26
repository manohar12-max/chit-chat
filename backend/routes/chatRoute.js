const express = require('express')
const { auth } = require('../middleware/authMiddleware')
const { accessChat, fetchChats,createGroupChat,renameGroup ,addToGroup,removeFromGroup} = require('../controllers/chatControllers')
const router= express.Router()

router.route("/").post(auth,accessChat) //to get one on one chat
router.route("/").get(auth,fetchChats)
 router.route("/group").post(auth,createGroupChat)
router.route("/rename").put(auth,renameGroup)
 router.route("/groupRemove").put(auth,removeFromGroup);
 router.route("/groupAdd").put(auth,addToGroup);
 



module.exports =router