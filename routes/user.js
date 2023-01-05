const express = require("express");
const passport = require("passport");

const userController = require("../controllers/user");

const router = express.Router();

// Get current logged user
router.get("/current", passport.authenticate("jwt", { session: false }), userController.getCurrentUser);
// Log in as guest
router.get("/guest", userController.loginGuest);
// Log out an user
router.get("/logout", userController.logoutUser);

module.exports = router;
