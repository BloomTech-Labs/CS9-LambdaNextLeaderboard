const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Organization = require("../../models/Organization");
const Class = require("../../models/Class");
const Student = require("../../models/Student");
const validateStudent = require("../../validation/students/studentValidation");
const validateClass = require("../../validation/classes/classValidation");

router.get("/test", (req, res) => res.json({ msg: "Classes route working" }));

// @route   GET api/classes/:id/students
// @desc    Gets a class' hired and unhired students
// @access  Private
router.get("/:id/students", (req, res) => {
  const id = req.params.id;

  Class.findById(id)
    .populate({
      path: "students",
      options: {
        sort: { hired: 1, lastname: 1, firstname: 1 }
      }
    })
    .then(aClass => {
      if (!aClass) {
        return res.status(404).json({ class: "That class does not exist" });
      }
      res.json(aClass.students);
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
      return res.status(404).json({ class: "That class does not exist" });
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

// @route   PUT api/classes/:id/update
// @desc    Updates the class' info
// @access  Private
router.put("/:id/update", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const { errors, isValid } = validateClass(data);

  //   Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const name = data.name;

  Organization.findById(data.orgId)
    .populate({ path: "classes", match: { name } })
    .then(org => {
      if (!org) {
        return res
          .status(404)
          .json({ organization: "That organization does not exist" });
      }

      if (org.classes.length) {
        return res.status(400).json({
          name: "This organization already has a class with that name"
        });
      }

      Class.findByIdAndUpdate(id, data).then(updated => {
        res.json(updated);
      });
    });
});

// @route   DELETE api/classes/:id/delete
// @desc    Deletes the class
// @access  Private

// As with organization, deleting the class leaves the students in the databse
// We definitely need to implement a cleanup, but for now just deleting the class
router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;

  Class.findByIdAndRemove(id).then(removed => {
    res.json(removed);
  });
});

module.exports = router;
