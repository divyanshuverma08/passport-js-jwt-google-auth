const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const userModel = require("../models/userModel");
const passport = require("passport");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "adfadfadfad";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      let user = await userModel.findOne({ _id: jwt_payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      if(err){
        return done(err,false);
      }
    }
  })
);
