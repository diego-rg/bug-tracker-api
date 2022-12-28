const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
      // passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          cb(null, existingUser);
        } else {
          const newUser = await new User({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          }).save();

          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          cb(null, newUser);
        }
      } catch (err) {
        cb(null, err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user);
  });
});
