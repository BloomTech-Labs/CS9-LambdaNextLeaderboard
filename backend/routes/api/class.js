const router = require("express").Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const _ = require("lodash");
const csv = require("fast-csv");

require("dotenv").config();

const Class = require("../../models/Class");
const Student = require("../../models/Student");
const validateStudent = require("../../validation/students/studentValidation");
const fetchGithubData = require("../../utils/githubAPI");
const fetchHuntrData = require("../../utils/huntrAPI");

// TEST ROUTE
router.get("/test", (req, res) => res.json({ msg: "Classes route working" }));

// @route   GET api/classes/:id/students
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

// @route   POST api/classes/:id/create
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
  const { firstname, lastname, email, github, huntr } = data;

  Class.findById(id).then(aClass => {
    if (!aClass) {
      return res.status(404).json({ class: "That class does not exist." });
    }

    const newStudent = new Student({
      firstname,
      lastname,
      email,
      github,
      huntr
    });
    newStudent.save().then(created => {
      aClass.students.push(created._id);
      aClass.save();
      res.status(201).json(created);
    });
  });
});

// @route   POST api/classes/data
// @desc    Gets Github/Huntr API data
// @access  Private(?)
router.post("/data", (req, res) => {
  let huntrData;

  StudentModel.find({ _admin: req.body.id })
    // .populate('_class')
    .then(async students => {
      gitDataFetch = [];
      storageData = await fetchGithubData(students);
      huntrData = await fetchHuntrData();
      res.status(201).json({ gitData: gitDataFetch, huntr: huntrData });
    })
    .catch(err => res.status(400).json({ error: err }));
});

// NEEDS REWORK TO FIT NEW MODELS
// @route   POST api/classes/:name/importcsv
// @desc    Adds a csv of students to the class
// @access  Private
router.post("/:id/importcsv", (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  // Reference
  const csvClassFile = req.files.file;  
  const classID = req.params.id;

  // Parse csv and check for existing class in db
  async function run() {
    csv
      .fromString(csvClassFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
      })
      .on("data", function(data) {
        Class.findById(classID).then(aClass => {
          if (!aClass) {
            return res
              .status(404)
              .json({ class: "That class does not exist." });
          }

          let newStudent = new Student();

          newStudent.firstname = data["firstname"];
          newStudent.lastname = data["lastname"];
          newStudent.email = data["email"];
          newStudent.github = data["github"];

          newStudent
            .save()
            .then(created => {
              aClass.students.push(created._id);
              aClass.save();
              //res.status(201).json(created); //Error: Can't set headers after they are sent.
            })
            .catch(err => console.log(err));
          console.log(`Saved: ${data["firstname"]} ${data["lastname"]}`);
        });
      });
  }

  run();
});

module.exports = router;
