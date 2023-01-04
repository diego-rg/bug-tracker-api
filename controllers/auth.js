const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRES_IN;
const spaUrl = process.env.SPA_URL;

const googleCallback = (req, res) => {
  if (req.user) {
    const token = jwt.sign({ id: req.user._id }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.redirect(spaUrl);
  } else {
    res.status(500).send({ message: "Error. Try to log in with another provider." });
  }
};

module.exports = { googleCallback };
