const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Organization = require("../../models/Organization");
const Class = require("../../models/Class");
const validateClass = require("../../validation/classes/classValidation");

const ACCESS_KEY = process.env.ACCESS_KEY;

// @route   GET api/organizations/:id/classes
// @desc    Gets organization's classes
// @access  Private
router.get("/:id/classes", (req, res) => {
  const id = req.params.id;

  Organization.findById(id)
    .populate("classes", null, null, { sort: { name: 1 } })
    .then(org => {
      if (!org) {
        return res
          .status(404)
          .json({ organization: "That organization does not exist." });
      }

      res.json(org.classes);
    });
});

// @route   POST api/organizations/:id/classes/create
// @desc    Creates a new class
// @access  Private
router.post("/:id/classes/create", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateClass(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const name = data.name;

  Organization.findById(id).then(org => {
    if (!org) {
      return res
        .status(404)
        .json({ organization: "That organization does not exist." });
    }

    // Class names shouldn't be unique so that different organizations can use the same class name.

    // Class.findOne({ name }).then(aClass => {
    //   if (aClass) {
    //     errors.name = "A class with that name already exists";
    //     return res.status(400).json(errors);
    //   }
    // });

    const newClass = new Class({ name });
    newClass.save().then(created => {
      org.classes.push(created._id);
      org.save();
      res.status(201).json(created);
    });
  });
});

module.exports = router;
