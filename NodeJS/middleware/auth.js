const User = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  const userDecoded = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(userDecoded);
  if (!user) res.status(404).send("Login!");
  req.user = user;
  next();
};

module.exports = verifyUser;