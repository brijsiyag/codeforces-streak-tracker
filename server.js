const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const send = require("./send");
const axios = require("axios");

axios
  .get(
    "https://codeforces.com/api/user.status?handle=brijsiyag&from=1&count=10"
  )
  .then((res) => {
    console.log(res.data);
  });

require("dotenv").config();
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
app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
