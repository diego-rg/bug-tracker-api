const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later",
    failureRedirect: process.env.SPA_OAUTH_FAILURE_REDIRECT_URL,
    successRedirect: process.env.SPA_OAUTH_SUCCESS_REDIRECT_URL,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.status(200).res.send("Successfully logged in");
  }
);

module.exports = router;
