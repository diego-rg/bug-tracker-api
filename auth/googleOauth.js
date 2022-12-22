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
    async (req, accessToken, refreshToken, profile, cb) => {
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return cb(err);
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              googleId: profile.id,
              email: profile.emails[0].value,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return cb(err, user);
            });
          } else {
            return cb(err, user);
          }
        }
      );
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
