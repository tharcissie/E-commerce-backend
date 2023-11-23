const express = require("express");
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
} = require("../controller/user.controller");
const router = express.Router();
const checkDuplicateUsernameOrEmail = require("../middleware/verifySignUp");

router.post("/signup", checkDuplicateUsernameOrEmail, signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:userId/:token", resetPassword);

module.exports = router;
