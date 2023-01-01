const spaUrl = process.env.SPA_URL;

// Get current logged user
const getCurrentUser = (req, res) => {
  res.json(req.user.name);
};

// Log out user
const logoutUser = (req, res) => {
  req.logout();
  res.redirect(spaUrl);
};

module.exports = { getCurrentUser, logoutUser };
