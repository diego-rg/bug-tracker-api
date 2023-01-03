const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      // passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          cb(null, user);
        } else {
          const user = await new User({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          }).save();
          cb(null, user);
        }
      } catch (err) {
        cb(null, err);
      }
    }
  )
);
