const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    let tokenData;
    try {
      tokenData = jwt.verify(token, "api-project");
      req.userId = tokenData.id;
      next();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else {
    res.status(404).json({ error: "token not fount" });
  }
};
module.exports = authenticateUser;
