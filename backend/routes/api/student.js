const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Student = require("../../models/Student");

// @route   PUT api/students/:id/update
// @desc    Updates a student's info
// @access  Private
router.put("/:id/update", (req, res) => {
  const data = jwt.decode(req.body.token, process.env.ACCESS_KEY);
  const id = req.params.id;

  Student.findByIdAndUpdate(id, data).then(updated => {
    res.json(updated);
  });
});

// @route   DELETE api/students/:id/delete
// @desc    Deletes a student by Id
// @access  Private
router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id).then(removed => {
    res.json(removed);
  });
});

module.exports = router;
