const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userModel = require("../models/userModel");

passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const oldUser = await userModel.findOne({ email: profile.emails[0].value });
  
        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }
  
      try {
        const newUser = await new userModel({
          email: profile.emails[0].value,
          google: {
            name: profile.displayName,
            email: profile.emails[0].value,
            id: profile.id
          }
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    },
  ));
