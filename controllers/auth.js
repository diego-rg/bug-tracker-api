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
      origin: "https://drg-bugtracker.vercel.app/",
    });
    res.redirect(spaUrl);
  }
};

module.exports = { googleCallback };
