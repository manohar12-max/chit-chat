const express = require("express");
const router = express.Router();
const {auth}=require("../middleware/authMiddleware")
const {
  signup,
  login,
  allUsers,
} = require("../controllers/userControllers");
router.route("/").post(signup).get(auth,allUsers);
router.post("/login", login);

// // })

module.exports = router;
