const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const payload = {
      email: req.user.email,
      id: req.user._id,
    };
    const token = jwt.sign(payload, "adfadfadfad", { expiresIn: "1d" });

    res.cookie("auth", token);
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
