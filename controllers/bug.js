const Bug = require("../models/bug");

//Show all bugs
const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    if (!bugs) {
      //Se non pode devolver datos. Non conta se a resposta contén un array vacío ao non haber datos
      res.status(400).send({ message: "Check the request data and try again" });
    } else {
      res.status(200).send({ bugs });
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
      res.status(200).send({ bug: saveBug });
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

module.exports = { getAllBugs, createBug };
