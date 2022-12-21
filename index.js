require("dotenv").config(); //Dev.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bugRoutes = require("./routes/bug");
const userRoutes = require("./routes/user");
require("./auth/googleOauth");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
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

app.use("/api/bugs", bugRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

module.exports = app;
