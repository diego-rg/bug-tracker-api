const Bug = require("../models/bug");

//Get all bugs
const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    if (!bugs) {
      //Se non pode devolver datos. Non conta se a resposta contén un array vacío ao non haber datos
      res.status(400).send({ msg: "Check the request data and try again" });
    } else {
      res.status(200).send({ bugs });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllBugs };
