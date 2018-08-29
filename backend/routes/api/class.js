const router = require("express").Router();

const ClassModel = require("../../models/ClassLS");
const StudentModel = require("../../models/Student")
const validateAddClass = require("../../validation/classes/addclass");
const validateAddStudent = require("../../validation/classes/addstudent");
// const githubData = require("../../data/githubData");
require("dotenv").config();
const axios = require("axios");
const _ = require("lodash");
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
let storage;
let huntrData;
let storageData;
// let gitDataFetch = [];
let huntrDataFech;

async function fetchGithubData(studentData) {
    gitDataFetch = []

     return (studentData.forEach(async (each, i) => {
         if (i === 0) {
             gitDataFetch = []
         }
        let gitHubHandle = each.github;
        let authStr = "Bearer " + process.env.GITHUB_AUTH_TOKEN; // Add token
         console.log("Inside testing", i)
         let xyCount = 0;
         if (gitHubHandle && studentData.length >= i && xyCount <= studentData.length) {
             xyCount++
             return await axios
                 .get(`https://api.github.com/users/${gitHubHandle}/events/public`, {
                     headers: {
                         Authorization: authStr
                     }
                 })
                 .then(res => {
                     let pushCount = 0;
                     let forkCount = 0;
                     let pullRequestCount = 0;
                     let createCount = 0;
                     let commitsByUser = 0;
                     let totalCommits = 0;
                     const data = res.data;
                     const distinctSize  = _.map(data, _.property('payload.distinct_size'));
                     const size = _.map(data, _.property('payload.size'));
                     let created_at = _.map(data, _.property('created_at'));
                     let stats = _.map(data, _.property('type'));
                     stats.forEach((typed, i) => {
                         if (typed === 'PushEvent') {
                             pushCount++
                         } else if (typed === 'ForkEvent') {
                             forkCount++
                         } else if (typed === 'PullRequestEvent') {
                             pullRequestCount++
                         } else if (typed === 'CreateEvent') {
                             createCount++
                         } else {

                         }
                     })
                     size.forEach((each, i) => {
                         if (each) {
                             totalCommits += each
                         }
                     })
                     distinctSize.forEach((each, i )=> {
                         if (each) {
                             commitsByUser += each
                         }
                     })

                     gitDataFetch.push({'Full Name': each.firstname + ' ' + each.lastname, 'totalCommits': totalCommits, 'commitsByUser': commitsByUser, 'pushCount': pushCount, 'forkCount': forkCount, 'pullRequestCount': pullRequestCount, 'createCount': createCount, 'size': size, 'distinct size': distinctSize, 'created': created_at, 'stats': stats})
                     return ({'totalCommits': totalCommits, 'commitsByUser': commitsByUser, 'pushCount': pushCount, 'forkCount': forkCount, 'pullRequestCount': pullRequestCount, 'createCount': createCount, 'size': size, 'distinct size': distinctSize, 'created': created_at, 'stats': stats});
                 })
                 .catch(err => {
                     gitDataFetch.push({'Full Name': each.firstname + ' ' + each.lastname,'error': 'Github handle not found'})
                     return gitDataFetch
                     console.log(err)
                 });
         }

    }))

}
async function fetchHuntrData() {
    let token = process.env.huntr_token // Add token

    return await axios
        .get('https://api.huntr.co/org/events', {
            // Add user github handle
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const dataDetails = [];
            const wholeData = [];
            res.data.data.forEach((each, i)=> {
                dataDetails.push(each.member);
                wholeData.push(each)
            })
            const givenNameArr = [...(new Set(dataDetails.map(({ givenName }) =>  givenName)))];
            const idArr = [...(new Set(dataDetails.map(({ id }) =>  id)))];
            const familyName = [...(new Set(dataDetails.map(({ familyName }) =>  familyName)))];
            const email = [...(new Set(dataDetails.map(({ email }) =>  email)))];
            const createdAt = [...(new Set(dataDetails.map(({ createdAt }) =>  createdAt)))];
            const isActive = [...(new Set(dataDetails.map(({ isActive }) =>  isActive)))];
            const studentsObject = [];
            idArr.forEach((each, i) => {
                studentsObject.push({
                    'id': idArr[i],
                    'firstname': familyName[i],
                    'givenNameArr': givenNameArr[i],
                    'familyName': familyName[i],
                    'email': email[i],
                    'createdAt': createdAt[i],
                    'isActive': isActive[i],
                    'count': 0
                })
            })
            wholeData.forEach((each) => {
                studentsObject.forEach((student, i) => {
                    if (student.id === each.member.id) {
                        if (each.eventType === "JOB_ADDED") {
                            studentsObject[i].count++
                        }
                    }
                })

            })
            huntrDataFech = studentsObject
            return studentsObject
        })
        .catch(err => console.log(err))
}


// @route   GET api/classes/test
// @desc    Tests classes route
// @access  Private


router.get("/test", (req, res) => res.json({msg: "Classes route working"}));

// @route   POST api/classes
// @desc    Gets all classes
// @access  Private
router.post("/", (req, res) => {
    ClassModel.find({_admin: req.body.id})
        .then(classes => res.json(classes))
        .catch(err => res.status(400).json({catchErr: err}));
});


router.post("/all", (req, res) => {
    StudentModel.find({_admin: req.body.id})
    // .populate('_class')
        .then(students => res.json(students))
        // .then( () => res.send(githubData))
        .catch(err => res.status(400).json({noUsers: err}));
})

router.post("/data", (req, res) => {
    StudentModel.find({_admin: req.body.id})
    // .populate('_class')
        .then(async students => {
                gitDataFetch = []
                storageData = await fetchGithubData(students)
                huntrData = await fetchHuntrData()
                res.status(201).json({'gitData': gitDataFetch, 'huntr': huntrData})
        }
        )
        .catch(err => res.status(400).json({error: err}))

        .catch(err => res.status(400).json({noUsers: err}));
})

// @route   GET api/classes/:name
// @desc    Gets a class by id
// @access  Private
router.get("/:name", (req, res) => {
    ClassModel.findOne({name: req.params.name})
        .then(aClass => {
            if (!aClass) {
                res.status(404).json({className: "That class does not exist"});
            } else {
                res.json(aClass);
            }
        })
        .catch(err => {
            res.status(400).json({catchErr: err});
        });
});

// @route   POST api/classes/addclass
// @desc    Creates new class
// @access  Private
router.post("/addclass", (req, res) => {
    // const { errors, isValid } = validateAddClass(req.body);

    // Validation Check
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    ClassModel.find({_admin: req.body._admin})
        .where('name')
        // .equals(req.body.name)
        .then(aClass => {
            aClass.forEach(each => {
                if (each.name === req.body.name) {
                    errors.name = "Class name already exists";
                    return res.status(400).json(errors);
                }
            })

            const {name, _admin, _coadmin} = req.body;
            const newClass = new ClassModel({name, _admin, _coadmin});

            newClass
                .save()
                .then(created => res.json(created))
                .catch(err => res.status(400).json({catchErr: err}));
            // }
        });
});

// @route   POST api/classes/:name/addstudent
// @desc    Adds a student to the class
// @access  Private
router.post("/:name/addstudent", (req, res) => {
    // const { errors, isValid } = validateAddStudent(req.body);
    const {_class, firstname, lastname, email, github, huntr, classname, _admin} = req.body;
    // const students = {_class, firstname, lastname, email, github, huntr}

    // Validation Check
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    StudentModel.find({_admin: req.body._admin}) //.then(aClass => {
        .then(aStudent => {
            const check = aStudent.forEach(each => {
                let errors = null
                if (each.github === req.body.github) {
                    let errors = "Student already exists, due to github"
                        .catch(() => {
                            return res.status(400).json(errors);
                        })
                }
                if (each.email === req.body.email) {
                    let errors = "Student already exists, due to email"
                        .catch(() => {
                            return res.status(400).json(errors);
                        })
                }
                if (each.huntr === req.body.huntr) {
                    let errors = "Student already exists, due to huntr"
                        .catch(() => {
                            return res.status(400).json(errors);
                        })
                }
                return errors
            })
            // if (check === null) {
            const newStudent = new StudentModel({
                _class,
                _admin,
                firstname,
                lastname,
                email,
                github,
                huntr,
                classname
            })
            newStudent

                .save()
                .then(newStu => {
                    res.status(201).send(newStu)
                })
                .catch(err => res.status(400).json({catchErr: err}));
            // }

            // }
        })

});
router.put("/:name/updatestudent", (req, res) => {
  // const {errors, isValid} = validateUpdateStudentInput(req.body);
  //   // Validation Check
  //   if (!isValid) {
  //       return res.status(400).json(errors);
  //   }
    const {_id} = req.body;
    // const id = req.body.id
    const options = {
        new: true
    }
        StudentModel.findByIdAndUpdate(_id, req.body, options)
            .then(students => {
                res.send(students)
            })
            .catch(err => {
                res.status(500).json(err);
            })

})
router.delete("/:name/deletestudent", (req, res) => {
    const {_id} = req.body;

        StudentModel.findByIdAndRemove(_id)
            .then(note => {
                res.status(201).send(note)
            })
            .catch(err => {
                res.status(500).json(err);
            })
})

// @route   PUT api/classes/:name/importcsv
// @desc    Adds a csv of students to the class
// @access  Private
router.put("/:name/importcsv", (req, res) => {
    const validData = [];
    const invalidData = [];

    req.body.csvData.forEach(data => {
        const {errors, isValid} = validateAddStudent(data);
        if (isValid) {
            validData.push(data);
        } else {
            invalidData.push({user: data, errors});
        }
    });

    StudentModel.find({_class: req.params._class}).then(aClass => {
        if (!aClass) {
            res.status(404).json({className: "That class does not exist"});
        } else {
            validData.forEach(data => {
                aClass.students.push(data);
            });
            aClass
                .save()
                .then(updated => {
                    res.json({updated, invalidData});
                })
                .catch(err => res.status(400).json({catchErr: err}));
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
        const {errors, isValid} = validateAddStudent(data);
        if (isValid) {
            validData.push(data);
        } else {
            invalidData.push({user: data, errors});
        }
    });

    ClassModel.find({}).then(aClass => {
        if (!aClass) {
            res.status(404).json({className: "That class does not exist"});
        } else {
            validData.forEach(data => {
                aClass.students.push(data);
            });
            aClass
                .save()
                .then(updated => {
                    res.json({updated, invalidData});
                })
                .catch(err => res.status(400).json({catchErr: err}));
        }
    });
});

module.exports = router;
