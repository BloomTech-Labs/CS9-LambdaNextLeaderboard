const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../../models/Admin");
const validateRegistration = require("../../validation/admins/registration");
const validateLogin = require("../../validation/admins/login");

const ACCESS_KEY = process.env.ACCESS_KEY;

// @route   GET api/admins/test
// @desc    Tests admins route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Admins route working" }));

// @route   POST api/admins/register
// @desc    Registers new admin
// @access  Public
router.post("/register", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateRegistration(data);

  // Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = data.username;
  const password = data.password;
  const email = data.email;

  Admin.findOne({ username }).then(admin => {
    if (admin) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const newAdmin = new Admin({ username, password, email });

      bcrypt.genSalt(11, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) return res.status(400).json(err);
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(created => res.json(created))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/admins/login
// @desc    Login admin and return JWT
// @access  Public
router.post("/login", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateLogin(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = data.username;
  const password = data.password;

  Admin.findOne({ username })
    .select("+password")
    .then(admin => {
      if (!admin) {
        errors.username = "Invalid Credentials";
        return res.status(400).json(errors);
      }

      // Check Password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          // Successful login creating token
          const payload = { id: admin._id, username: admin.username };
          jwt.sign(payload, ACCESS_KEY, { expiresIn: "10h" }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              username: admin.username,
              id: admin._id
            });
          });
        } else {
          errors.username = "Invalid Credentials";
          return res.status(400).json(errors);
        }
      });
    });
});

module.exports = router;
