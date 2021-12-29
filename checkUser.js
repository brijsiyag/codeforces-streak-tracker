const Axios = require("axios");
const verditctCheck = require("./verdictCheck");
const sendMail = require("./send");
const checkUser = async (username, email) => {
  let verdictOkFound = false;
  const data = await verditctCheck(username);
  if (
    data.status &&
    new Date().getDate() !==
      new Date(data.result.creationTimeSeconds * 1000).getDate()
  ) {
    console.log(username, email);
    sendMail(username, email);
  }
};
module.exports = checkUser;
