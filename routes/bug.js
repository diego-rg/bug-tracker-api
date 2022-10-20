const express = require("express");
const bugController = require("../controllers/bug");

const router = express.Router();

router.get("/", bugController.getAllBugs);
router.post("/", bugController.createBug);
router.put("/:id", bugController.updateBug);

module.exports = router;
