const express = require("express");
const passport = require("passport");

const bugController = require("../controllers/bug");

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false, failureMessage: true }), bugController.getAllBugs);
router.get("/:id", passport.authenticate("jwt", { session: false, failureMessage: true }), bugController.getBugById);
router.post("/", passport.authenticate("jwt", { session: false, failureMessage: true }), bugController.createBug);
router.put("/:id", passport.authenticate("jwt", { session: false, failureMessage: true }), bugController.updateBug);
router.delete("/:id", passport.authenticate("jwt", { session: false, failureMessage: true }), bugController.deleteBug);

module.exports = router;
