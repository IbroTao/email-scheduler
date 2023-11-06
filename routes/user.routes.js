const router = require("express").Router();
const { verifyAndAuthorizeUser } = require("../middlewares/header");
const {
  registerUser,
  loginUser,
  changeEmail,
  changePassword,
} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change/email/:id", verifyAndAuthorizeUser, changeEmail);
router.post("/change/password/:id", verifyAndAuthorizeUser, changePassword);

module.exports = router;
