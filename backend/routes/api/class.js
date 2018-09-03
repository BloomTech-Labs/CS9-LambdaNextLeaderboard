const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Class = require("../../models/Class");
const Student = require("../../models/Student");
const validateStudent = require("../../validation/students/studentValidation");

router.get("/test", (req, res) => res.json({ msg: "Classes route working" }));

// @route   GET api/classes/:id/students
// @route   GET api/classes/leaderboard

// @desc    Gets a class' unhired students
// @access  Private
router.get("/:id/students", (req, res) => {
  const id = req.params.id;
  let hired = [];

  Class.findById(id)
    .populate("students", null, { hired: true })
    .then(aClassWithHired => {
      hired = aClassWithHired.students;

      Class.findById(id)
        .populate(
          "students",
          null,
          { hired: false },
          {
            sort: { lastname: 1, firstname: 1 }
          }
        )
        .then(aClass => {
          if (!aClass) {
            return res
              .status(404)
              .json({ class: "That class does not exist." });
          }
          res.json({ unhired: aClass.students, hired });
        });
    });
});

// @route   POST api/classes/:id/students/create
// @desc    Creates a new student
// @access  Private
router.post("/:id/students/create", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateStudent(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const { firstname, lastname, email, github } = data;

  Class.findById(id).then(aClass => {
    if (!aClass) {
      return res.status(404).json({ class: "That class does not exist." });
    }

    const newStudent = new Student({
      firstname,
      lastname,
      email,
      github
    });
    newStudent.save().then(created => {
      aClass.students.push(created._id);
      aClass.save();
      res.status(201).json(created);
    });
  });
});

module.exports = router;
