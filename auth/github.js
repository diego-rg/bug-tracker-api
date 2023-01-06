const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../models/user");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ githubId: profile.id });
        if (user) {
          cb(null, user);
        } else {
          const user = await new User({
            name: profile.displayName,
            githubId: profile.id,
            email: profile.email,
          }).save();
          cb(null, user);
        }
      } catch (err) {
        cb(null, err);
      }
    }
  )
);
