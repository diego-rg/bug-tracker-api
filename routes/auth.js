const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth");
const spaUrl = process.env.SPA_URL;
const authUrl = process.env.GOOGLE_OAUTH_URL;

const router = express.Router();
const failureRedirect = authUrl;
const successRedirect = spaUrl;

// Google login
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failureRedirect,
    session: false,
  }),
  authController.googleCallback
);

module.exports = router;
