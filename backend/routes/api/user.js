const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const validateRegistration = require("../../validation/users/registration");
const validateLogin = require("../../validation/users/login");

const ACCESS_KEY = process.env.ACCESS_KEY;

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users route working" }));

// @route   POST api/users/register
// @desc    Registers new user
// @access  Public
router.post("/register", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateRegistration(data);

  // Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: data.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: data.username,
        password: data.password
      });

      bcrypt.genSalt(11, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(created => res.json(created))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user and return JWT
// @access  Public
router.post("/login", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateLogin(data);

  // Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = data.username;
  const password = data.password;
  User.findOne({ username })
    .select("+password")
    .then(user => {
      if (!user) {
        errors.username = "Username not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Successful login creating token
          const payload = { id: user._id, name: user.username };
          jwt.sign(payload, ACCESS_KEY, { expiresIn: "10h" }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              username: user.username
            });
          });
        } else {
          errors.password = "Invalid Credentials";
          return res.status(400).json(errors);
        }
      });
    });
});

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  }
);

module.exports = router;
