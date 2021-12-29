const nodemailer = require("nodemailer");
const google = require("googleapis");
const ejs = require("ejs");

const send = (username, email) => {
  console.log(username, email);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.user,
      pass: process.env.pass,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
    },
  });
  ejs.renderFile(
    __dirname + "/views/index.ejs",
    { username: username },
    (err, data) => {
      let mailOptions = {
        from: "Don't let your streak bresk!! <prakashram9571@gmail.com>",
        to: email,
        subject: `Hey ${username}, Don't let your streak break!!`,
        html: `${data}`,
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log(data, "Email sent successfully");
        }
      });
    }
  );
};
module.exports = send;
