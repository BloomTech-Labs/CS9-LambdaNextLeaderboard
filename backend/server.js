const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");

// import routes
const users = require("./routes/api/user");
const classes = require("./routes/api/class");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

// Connect MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("=== Connected to MongoDB ===\n"))
  .catch(err => console.log(err));

// Set up passport middleware
app.use(passport.initialize());
require("./authentication/passport")(passport);

// Connect routes
app.use("/api/users", users);
app.use(
  "/api/classes",
  passport.authenticate("jwt", { session: false }),
  classes
);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`\nServer is running on port ${port}`));
