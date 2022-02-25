const jwt = require("jsonwebtoken");
const JWT_SECRET = "Cyrus";

const fetchuser = (req, res, next) => {
  //get the user from jwt token and add id to req oject
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please autheticate using valid token" });
  }

  try {
    console.log(token);
    const data = jwt.verify(token, JWT_SECRET);
    console.log(token);
    req.user = data.user;
    console.log(data);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please aautheticate using valid token" });
  }
};
module.exports = fetchuser;
