const express = require("express");
const passport = require("passport");

const router = express.Router();

const failureRedirect = "http://localhost:8000/api/oauth/google";
const successRedirect = "http://localhost:3000";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", //volve a pedir seleccionar conta despois de logout
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later",
    failureRedirect: failureRedirect,
    successRedirect: successRedirect,
  }),
  (req, res) => {
    res.status(200).res.send("Successfully logged in");
  }
);

module.exports = router;
