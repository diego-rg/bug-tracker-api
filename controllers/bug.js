const Bug = require("../models/bug");

//Show all bugs
const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    if (!bugs) {
      res.status(400).send({ message: "Check the request data and try again" });
    } else {
      res.status(200).send({ bugs });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Show one bug by ID
const getBugById = async (req, res) => {
  const bugId = req.params.id;
  try {
    const bug = await Bug.findById(bugId);
    if (!bug) {
      res.status(400).send({ message: "Check the request data and try again" });
    } else {
      res.status(200).send({ bug });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Create a bug
const createBug = async (req, res) => {
  const bug = new Bug(req.body);

  try {
    const saveBug = await bug.save();
    if (!saveBug) {
      res.status(400).send({ message: "Check the request data and try again" });
    } else {
      res.status(200).send({ message: "Bug created successfully" });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({
        message:
          "Bug validation failed: name: A bug with that name already exists",
      });
    } else res.status(500).send(error);
  }
};

//Update a bug
const updateBug = async (req, res) => {
  const bugId = req.params.id;
  const newData = req.body;

  try {
    const bug = await Bug.findByIdAndUpdate(bugId, newData);
    if (!bug) {
      res.status(400).send({ message: "Check the request data and try again" });
    } else {
      res.status(200).send({ message: "Bug data updated successfully" });
    }
  } catch (error) {
    if (error.path === "_id") {
      res.status(400).send({
        message: "Bug not found: Check the bug id and try again",
      });
    } else {
      res.status(500).send(error);
    }
  }
};

//Delete a bug
const deleteBug = async (req, res) => {
  const bugId = req.params.id;

  try {
    const bug = await Bug.findByIdAndDelete(bugId);
    if (!bug) {
      res.status(400).send({ message: "Check the request data and try again" });
    } else {
      res.status(200).send({ message: "Bug deleted successfully" });
    }
  } catch (error) {
    if (error.path === "_id") {
      res.status(400).send({
        message: "Bug not found: Check the bug id and try again",
      });
    } else {
      res.status(500).send(error);
    }
  }
};

module.exports = { getAllBugs, getBugById, createBug, updateBug, deleteBug };
