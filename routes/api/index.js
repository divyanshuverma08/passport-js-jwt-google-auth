const express = require("express");
const passport = require("passport")
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../../models/userModel");
const router = express.Router();

router.post("/register", (req, res) => {
  let user = new userModel({
    email: req.body.email,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      res.send({
        success: true,
        message: "user created",
        user: {
          email: user.email,
          id: user._id,
        },
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});

router.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(401)
      .send({ success: false, message: "Could not find user" });
  }
  if (!compareSync(req.body.password, user.password)) {
    return res
      .status(401)
      .send({ success: false, message: "Incorrect password" });
  }

  const payload = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, "adfadfadfad", { expiresIn: "1d" });

  return res
    .status(200)
    .send({ success: true, message: "Logged in successfully", token: token });
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res
      .status(200)
      .send({
        success: true,
        user: { id: req.user._id, email: req.user.email },
      });
  }
);

module.exports = router;
