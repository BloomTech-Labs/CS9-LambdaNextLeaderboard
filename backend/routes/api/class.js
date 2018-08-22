const router = require("express").Router();

const ClassModel = require("../../models/Class");
const validateAddClass = require("../../validation/classes/addclass");
const validateAddStudent = require("../../validation/classes/addstudent");

// @route   GET api/classes/test
// @desc    Tests classes route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Classes route working" }));

// @route   GET api/classes
// @desc    Gets all classes
// @access  Private
router.get("/", (req, res) => {
  ClassModel.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json({ catchErr: err }));
});

// @route   GET api/classes/:name
// @desc    Gets a class by id
// @access  Private
router.get("/:name", (req, res) => {
  ClassModel.findOne({ name: req.params.name })
    .then(aClass => {
      if (!aClass) {
        res.status(404).json({ className: "That class does not exist" });
      } else {
        res.json(aClass);
      }
    })
    .catch(err => {
      res.status(400).json({ catchErr: err });
    });
});

// @route   POST api/classes/addclass
// @desc    Creates new class
// @access  Private
router.post("/addclass", (req, res) => {
  const { errors, isValid } = validateAddClass(req.body);

  // Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  ClassModel.findOne({ name: req.body.name }).then(aClass => {
    if (aClass) {
      errors.name = "Class name already exists";
      return res.status(400).json(errors);
    } else {
      const newClass = new ClassModel({
        name: req.body.name
      });

      newClass
        .save()
        .then(created => res.json(created))
        .catch(err => res.status(400).json({ catchErr: err }));
    }
  });
});

// @route   PUT api/classes/:name/addstudent
// @desc    Adds a student to the class
// @access  Private
router.put("/:name/addstudent", (req, res) => {
  const { errors, isValid } = validateAddStudent(req.body);

  // Validation Check
  if (!isValid) {
    return res.status(400).json(errors);
  }

  ClassModel.findOne({ name: req.params.name }).then(aClass => {
    if (!aClass) {
      res.status(404).json({ className: "That class does not exist" });
    } else {
      aClass.students.push(req.body);
      aClass
        .save()
        .then(updated => {
          res.json(updated);
        })
        .catch(err => res.status(400).json({ catchErr: err }));
    }
  });
});
// router.put("/:name/updatestudent", (req, res) => {
//   const {errors, isValid} = validateUpdateStudentInput(req.body);
//     // Validation Check
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }
//     const options = {
//       new: true
//     }
//     let {ID } = req.body;
//     let
// })

// @route   PUT api/classes/:name/importcsv
// @desc    Adds a csv of students to the class
// @access  Private
router.put("/:name/importcsv", (req, res) => {
  const validData = [];
  const invalidData = [];

  req.body.csvData.forEach(data => {
    const { errors, isValid } = validateAddStudent(data);
    if (isValid) {
      validData.push(data);
    } else {
      invalidData.push({ user: data, errors });
    }
  });

  ClassModel.findOne({ name: req.params.name }).then(aClass => {
    if (!aClass) {
      res.status(404).json({ className: "That class does not exist" });
    } else {
      validData.forEach(data => {
        aClass.students.push(data);
      });
      aClass
        .save()
        .then(updated => {
          res.json({ updated, invalidData });
        })
        .catch(err => res.status(400).json({ catchErr: err }));
    }
  });
});

// @route   POST api/classes/:name/importcsv
// @desc    Adds a csv of students to the class
// @access  Private
router.post("/:name/importcsv", (req, res) => {
  const validData = [];
  const invalidData = [];

  req.body.csvData.forEach(data => {
    const { errors, isValid } = validateAddStudent(data);
    if (isValid) {
      validData.push(data);
    } else {
      invalidData.push({ user: data, errors });
    }
  });

  ClassModel.findOne({ name: req.params.name }).then(aClass => {
    if (!aClass) {
      res.status(404).json({ className: "That class does not exist" });
    } else {
      validData.forEach(data => {
        aClass.students.push(data);
      });
      aClass
        .save()
        .then(updated => {
          res.json({ updated, invalidData });
        })
        .catch(err => res.status(400).json({ catchErr: err }));
    }
  });
});

module.exports = router;
