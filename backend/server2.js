require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');

// import routes
const users = require("./routes/api2/user");
const classes = require("./routes/api2/class");
// const student = require("./routes/api2/student");
// const billing = require("./routes/api/payment");
// const githubData = require("./data/githubData");


// CSV imports
//const template = require("./template.js");
const upload = require("./utils/upload");

// Middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());




// // ****START STRIPE****

// const CORS_WHITELIST = require('./billing/frontend');

// const corsOptions = {
//   origin: (origin, callback) =>
//     (CORS_WHITELIST.indexOf(origin) !== -1)
//       ? callback(null,true)
//       : callback(new Error('Not allowed by CORS'))
// };

// const configureServer = app => {
//   app.use(cors(corsOptions));
//   app.use(bodyParser.json());
// };

// const paymentApi = require('./billing/payment');

// const configureRoutes = app => {
//   paymentApi(app);
// };


// configureServer(app);
// configureRoutes(app);

// // ****END STRIPE****




// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../leaderboard-frontend/build")));

// Connect MongoDB
const db = process.env.MONGO_URI;
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
// app.use("/api/data", githubData);
// app.use("/api/billing", billing);

// CSV routes
//app.get("/template");
app.post("/create-edit", upload.post);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`\nServer is running on port ${port}`));
