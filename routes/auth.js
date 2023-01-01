const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth");
const spaUrl = process.env.SPA_URL;
const authUrl = process.env.GOOGLE_OAUTH_URL;

const router = express.Router();
const failureRedirect = authUrl;
const successRedirect = spaUrl;

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later",
    failureRedirect: failureRedirect,
    session: false,
  }),
  authController.googleCallback
);

module.exports = router;
