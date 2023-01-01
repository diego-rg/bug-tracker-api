const express = require("express");
const passport = require("passport");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/current", passport.authenticate("jwt", { session: false }), userController.getCurrentUser);

router.get("/logout", userController.logoutUser);

module.exports = router;
