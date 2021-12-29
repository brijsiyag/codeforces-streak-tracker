const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const nodeCron = require("node-cron");
const HomeRoute = require("./Routes/User/Routes/home");
require("dotenv").config();

// MiddleWares

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(
  process.env.DBURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Failed to connect database " + err);
    } else {
      console.log("Database connected successfully......");
    }
  }
);

//nodecrone setup

app.get("/", HomeRoute);
app.post("/", HomeRoute);

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
