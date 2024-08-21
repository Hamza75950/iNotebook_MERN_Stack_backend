const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using POST: "/api/auth/" dosent require auth.

router.post(
  "/",
  [
    body(
      "name",
      "Enter a valid name and it should be minimum 3 character long "
    ).isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password should be minimum 8 character long ").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with signup if no validation errors
    User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "Email is already been use" ,message: err.message});
      });
  }
);

module.exports = router;
