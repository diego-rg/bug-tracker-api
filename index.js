require("dotenv").config(); //Dev

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo connection open");
  })
  .catch((err) => {
    console.log("Mongo connection error");
    console.log(err);
  });

// For testing purposes
app.get("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
