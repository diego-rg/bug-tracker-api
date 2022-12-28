const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRES_IN;

const router = express.Router();

const failureRedirect = "http://localhost:8000/api/oauth/google";
const successRedirect = "http://localhost:3000";

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
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
    if (req.user) {
      const token = jwt.sign({ id: req.user._id }, jwtSecret, {
        expiresIn: jwtExpiration,
      });
      res.status(200).send({
        token: token,
      });
    }
  }
);

module.exports = router;
