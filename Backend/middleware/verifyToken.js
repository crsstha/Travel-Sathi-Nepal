const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //get the user from jwt token and add id to req oject
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .send({ error: "Please autheticatee using valid token" });
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin === "true") {
      next();
    } else {
      res.status(403).json("You are not allowed to Authorization");
    }
  });
};
const verifyTokenAndHost = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isHost === "true" || req.user.isAdmin === "true") {
      next();
    } else {
      res.status(403).json("You are not allowed to Authorization");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === "true") {
      next();
    } else {
      res.status(403).json("You are not allowed to Authorization");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndHost,
  verifyTokenAndAdmin,
};
