// require("dotenv").config(); //Dev.

const express = require("express");
const mongoose = require("mongoose");

const bugRoutes = require("./routes/bug");

const app = express();
app.use(express.json());

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

app.use("/api/bugs", bugRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
