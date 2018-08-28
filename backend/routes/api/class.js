const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Class = require("../../models/Class");
const Student = require("../../models/Student");

router.get("/test", (req, res) => res.json({ msg: "Classes route working" }));

// @route   POST api/classes
// @desc    Gets all classes
// @access  Private
router.post("/", (req, res) => {
  ClassModel.find({ _admin: req.body.id })
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json({ catchErr: err }));
});

module.exports = router;
