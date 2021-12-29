const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.get("/*", (req, res) => {
  res.render("main");
});
router.post("/", (req, res) => {
  User.find(
    { username: req.body.username, email: req.body.email },
    async (err, data) => {
      if (err || data) {
        console.log(err);
        return res.redirect("/");
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
      });
      await user.save();
      res.redirect("/");
    }
  );
});

module.exports = router;
