const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/current", (req, res) => {
  res.send(req.user);
  console.log(req.user);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.send(req.user);
});

module.exports = router;
