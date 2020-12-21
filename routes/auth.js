const express = require("express");
const {
  register,
  login,
  logout,
  status,
  updatePassword,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/status", status);
router.put("/password", updatePassword);

module.exports = router;
