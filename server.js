const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const nodeCron = require("node-cron");
const user = require("./Routes/User/models/user");
const HomeRoute = require("./Routes/User/Routes/home");
require("dotenv").config();
const checkUser = require("./checkUser");
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

// Prevent Heroku From Sleeping
//Main Functionality

nodeCron.schedule("00 00 23 * * *", function () {
  user.find({}, async (err, data) => {
    if (err) {
      return console.log(err);
    }
    data.forEach((element) => {
      checkUser(element.username, element.email);
    });
  });
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
