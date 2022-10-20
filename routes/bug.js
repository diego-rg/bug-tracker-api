const express = require("express");
const bugController = require("../controllers/bug");

const router = express.Router();

router.get("/", bugController.getAllBugs);

module.exports = router;
