const csv = require("fast-csv");
const mongoose = require("mongoose");
const csvClass = require("./classImportSchema");

// Export upload.get to server
exports.post = (req, res) => {
  // Check that a file is uploaded
  if (!req.files) return res.status(400).send("No files were uploaded.");

  // Reference to uploaded file
  const classFile = req.files.file;

  // Populated as CSV parsed
  const students = [];

  csv
    // Accept CSV as string, ignore headers + empty rows
    .fromString(classFile.data.toString(), {
      headers: true,
      ignoreEmpty: true
    })
    // Listener | Called every row, assigns _id to student
    .on("data", data => {
      data["_id"] = new mongoose.Types.ObjectId();

      students.push(data);
    })
    // Listener | End of parse, pass students arr to csvClass model
    .on("end", function() {
      csvClass.create(students, function(err, documents) {
        if (err) throw err;
      });

      res.send(students.length + " users have been successfully uploaded.");
    });
};
