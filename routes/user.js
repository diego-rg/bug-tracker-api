const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:8000/api/oauth/google");
});

module.exports = router;
