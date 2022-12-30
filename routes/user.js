const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user.name);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

module.exports = router;
