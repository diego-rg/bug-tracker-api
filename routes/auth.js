const express = require("express");
const passport = require("passport");

const authController = require("../controllers/auth");
const spaUrl = process.env.SPA_URL;

const router = express.Router();

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
    failureRedirect: spaUrl,
    session: false,
  }),
  authController.googleCallback
);

// Github login
router.get("/github", passport.authenticate("github", { session: false, scope: ["user"] }));

// Github callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: spaUrl }),
  authController.githubCallback
);

module.exports = router;
