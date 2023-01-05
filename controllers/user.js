const jwt = require("jsonwebtoken");

const User = require("../models/user");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRES_IN;
const spaUrl = process.env.SPA_URL;

const getCurrentUser = (req, res) => {
  res.json(req.user.name);
};

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.redirect(spaUrl);
};

const loginGuest = async (req, res) => {
  try {
    const user = await User.findOne({ name: "Guest" });
    if (user) {
      const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: jwtExpiration,
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.redirect(spaUrl);
    } else {
      res.status(500).send({ message: "Error. Log in as registered user or try again later." });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getCurrentUser, logoutUser, loginGuest };
