const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRES_IN;
const spaUrl = process.env.SPA_URL;

const googleCallback = (req, res) => {
  if (req.user) {
    const token = jwt.sign({ id: req.user._id }, jwtSecret, {
      expiresIn: jwtExpiration,
      domain: "https://drg-bugtracker.vercel.app/",
      sameSite: "none",
    });
    res.cookie("token", token);
    res.redirect(spaUrl);
  }
};

module.exports = { googleCallback };
