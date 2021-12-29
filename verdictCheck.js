const Axios = require("axios");

const verditctCheck = async (username) => {
  return new Promise((resolve) => {
    Axios.get(`https://codeforces.com/api/user.status?handle=${username}`).then(
      (res) => {
        const result = res.data.result.filter((element) => {
          return element.verdict === "OK";
        });
        if (result.size == 0) {
          return resolve({ status: false });
        }
        return resolve({ status: true, result: result[0] });
      }
    );
  });
};

module.exports = verditctCheck;
