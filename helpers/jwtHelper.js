const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
    const payload = {
        id: user._id,
        EmailAddress: user.EmailAddress,
        Role: user.Role
    };

    return jwt.sign(payload, secretKey, {expiresIn: '2m'});
}

const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        EmailAddress: user.EmailAddress,
        Role: user.Role
    };

    return jwt.sign(payload, secretKey, {expiresIn: '1h'});
}

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ success: false, message: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, secretKey); 
    req.user = verified; 
    next();
  } catch (err) {
    res.status(400).send({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;


module.exports = {generateToken, generateRefreshToken, verifyToken};