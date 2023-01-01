require("dotenv").config(); //Dev.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const bugRoutes = require("./routes/bug");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
require("./auth/googleAuth");
require("./auth/jwt");

const PORT = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/api/bugs", bugRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo connection open");
  })
  .catch((err) => {
    console.log("Mongo connection error");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

module.exports = app;
