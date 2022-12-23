const path = require("path");
const type = require(path.join(__dirname, "type.js"));
const temp = require(path.join(__dirname, "temp.json"));

module.exports = {
  type: type.Mult,
  data: temp,
};
