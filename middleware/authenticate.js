const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

const authenticateMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authentication Failed!" });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (error, data) => {
    if (error) {
      return res.status(401).json({ error: "Authentication Failed!" });
    }
    req.user = data;
    next();
  });
};

module.exports = authenticateMiddleware;
