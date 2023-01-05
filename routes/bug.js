const express = require("express");
const passport = require("passport");

const bugController = require("../controllers/bug");

const router = express.Router();

// Get all bugs
router.get("/", passport.authenticate("jwt", { session: false }), bugController.getAllBugs);
// Get one bug by id
router.get("/:id", passport.authenticate("jwt", { session: false }), bugController.getBugById);
// Post one bug
router.post("/", passport.authenticate("jwt", { session: false }), bugController.createBug);
// Update one bug
router.put("/:id", passport.authenticate("jwt", { session: false }), bugController.updateBug);
// Delete one bug
router.delete("/:id", passport.authenticate("jwt", { session: false }), bugController.deleteBug);

module.exports = router;
