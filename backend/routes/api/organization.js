const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Organization = require("../../models/Organization");
const Class = require("../../models/Class");

const ACCESS_KEY = process.env.ACCESS_KEY;

// @route   GET api/organizations/:id/classes
// @desc    Gets organization's classes
// @access  Private
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Organization.findById(id)
    .populate("classes")
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

  // ===== class validation requried here =====

  const id = req.params.id;
  const name = data.name;

  Organization.findById(id).then(org => {
    if (!org) {
      return res
        .status(404)
        .json({ organization: "That organization does not exist." });
    }

    const newClass = new Class({ name });
    newClass.save().then(created => res.json(created));
  });
});

module.exports = router;
