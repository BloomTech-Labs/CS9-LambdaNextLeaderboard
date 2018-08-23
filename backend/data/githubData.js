require("dotenv").config();
const axios = require("axios");
const _ = require("lodash");
const router = require("express").Router();

// import oauth
// need?
const clientID = require("../config/keys").clientID;
const clientSecret = require("../config/keys").clientSecret;

// Fetch user commits
async function fetchGithubData(githubHandle, ACCESS_TOKEN) {
  let authStr = "Bearer " + process.env.GITHUB_AUTH_TOKEN; // Add token

  return await axios
    .get(`https://api.github.com/users/cgoez/events/public`, {
      // Add user github handle
      headers: {
        Authorization: authStr
      }
    })
    .then(res => {
      const data = res.data;

      return _.chain(data)
        .filter(obj => obj.type === "PushEvent")
        .map(e => e.payload.commits)
        .flatMap()
        .map(commit => commit.message)
        .size();
    })
    .catch(err => console.log(err));
}

// Int storage var
let storage;

// Fetch Github data every 5s
setInterval(async () => {
  console.log("Fetching github data");
  storage = await fetchGithubData();
  console.log("Finished");
}, 5000);

// @route   GET api/data
// @desc    Gets user commits
// @access  Public (for now)
router.get("/", async (req, res) => {
  res.send(storage);
});

module.exports = router;
