const jwt = require("jsonwebtoken");
require("dotenv").config();

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  token = token.slice(7);
  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
