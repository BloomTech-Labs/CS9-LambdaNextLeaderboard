import {
//   LOGIN_ACTION,
//   LOGOUT_ACTION,
//   CREATE_USER,
//   // UPDATE_STUDENT,
//   ADD_CLASS,
//   ADD_STUDENT,
//   // GET_CLASS_STUDENTS,
//   //  ADD_CSV_STUDENTS,
//   GET_CLASSES_STUDENTS,
//   LOGIN_ERRORS,
//   REGISTER_ERRORS,
//   ERRORS,
//   REDIRECT_DATA_CLASS,
//   GET_STUDENTS,
    GET_GITHUB_DATA,
    CLASS_TO_QUERY,
    CHANGE_SETTINGS
//   EDIT_STUDENT,
//   REMOVE_STUDENT
} from "../actions/";

import {
    ADMIN_REGISTER,
    ADMIN_REGISTER_ERRORS,
    ADMIN_LOGIN,
    ADMIN_LOGIN_ERRORS,
    ADMIN_LOGOUT,
    GET_ADMIN_ORGANIZATIONS,
    ADD_ADMIN_ORGANIZATIONS_ERRORS,
    ADD_ADMIN_ORGANIZATIONS,
    UPDATE_ADMIN,
    ERRORS
} from "../actions/adminActions";
import {
    GET_ORGANIZATION_CLASSES,
    ADD_ORGANIZATION_CLASSES_ERRORS,
    ADD_ORGANIZATION_CLASSES,
    DELETE_ORGANIZATION
} from "../actions/organizationActions";
import {
    GET_CLASS_STUDENTS,
    ADD_CLASS_STUDENTS_ERRORS,
    ADD_CLASS_STUDENTS
} from "../actions/classActions";
import {UPDATE_STUDENT, DELETE_STUDENT} from "../actions/studentActions";
import {SET_CLASS_QUERY} from "../actions";

const initialState = {
    // registeredAdmin: {},
    // registerErrors: {},
    // loginErrors: {},
    // error: {},
    // successfulRegister: false,
    // user_logged_in: null,
    successfulLogin: false,
    // updateCheck: false,
    // created_class: null,
    // added_student: null,
    // classlist_students: null,
    // allClasses: null,
    // allStudents: null,
    // fetchSuccess: false,
    // fetchClasses: null,
    githubData: null,
    classToQuery: null,

    // // updatedStudent: null,
    // editStudent: null,
    // removedStudent: null,

    registeredAdmin: {},
    registerErrors: {},
    loggedInAdmin: "",
    loginErrors: {},

    adminOrganizations: [],
    newOrganizationErrors: {},
    createdOrganization: {},
    deletedOrganization: {},

    organizationClasses: [],
    newClassErrors: {},
    createdClass: {},

    classStudents: {},
    newStudentErrors: {},
    createdStudent: {},
    updatedStudent: {},
    deletedStudent: {},
    changeSettings: false,
    updateAdmin: null
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        // case CREATE_USER:
        //   return Object.assign({}, state, {
        //     username: action.payload,
        //     successfulRegister: action.successfulRegister
        //   });
        // case LOGIN_ACTION:
        //   return Object.assign({}, state, {
        //     user_logged_in: {
        //       ...state.user,
        //       token: action.payload,
        //       username: action.username,
        //       id: action.id,
        //       organization: action.organization
        //     },
        //     organization: action.organization,
        //     successfulLogin: action.successfulLogin
        //     // expiration: action.expiration
        //     // error: {}
        //   });
        // case LOGOUT_ACTION:
        //   return Object.assign({}, state, {
        //     successfulLogin: action.successfulLogin,
        //     allStudents: null,
        //     allClasses: null,
        //     classlist_students: null,
        //     fetchSuccess: false,
        //     user_logged_in: null,
        //     error: null
        //   });
        // case LOGIN_ERRORS:
        //   return Object.assign({}, state, {
        //     loginErrors: action.payload
        //   });
        // case REGISTER_ERRORS:
        //   return Object.assign({}, state, {
        //     registerErrors: action.payload
        //   });
        case ERRORS:
          return Object.assign({}, state, {
            errors: action.payload
          });
        // // case ADD_CLASS:
        // //     return Object.assign({}, state, {
        // //         students: {...state.user, username: action.user},
        // //         class: action.class_name
        // //     });
        // //When we fetch data, we need to set updateCheck to False
        // //It should be set on the first get request, after the login.
        // case ADD_CLASS:
        //   return Object.assign({}, state, {
        //     created_class: {
        //       classname: action.payload,
        //       students: action.students
        //     },
        //     allClasses: null
        //   });
        // case ADD_STUDENT:
        //   return Object.assign({}, state, {
        //     added_student: {
        //       user: action.user,
        //       className: action.class_name,
        //       students: action.payload
        //     },
        //     allClasses: null,
        //     classlist_students: null,
        //     allStudents: null
        //   });
        // // case GET_CLASS_STUDENTS:
        // //   return Object.assign({}, state, {
        // //     classlist_students: {
        // //       className: action.class_name,
        // //       students: action.payload
        // //     },
        // //     test: action.test,
        // //     updateCheck: false
        // //   });
        // case GET_CLASSES_STUDENTS:
        //   return Object.assign({}, state, {
        //     allClasses: action.payload,
        //     fetchClasses: action.fetchClasses
        //   });
        // case REDIRECT_DATA_CLASS:
        //   return Object.assign({}, state, {
        //     classlist_students: action.classlist_students,
        //     allClasses: action.allClasses
        //   });
        // case GET_STUDENTS:
        //   return Object.assign({}, state, {
        //     allStudents: action.payload,
        //     githubData: action.githubData
        //   });
        // case GET_GITHUB_DATA:
        //   return Object.assign({}, state, {
        //     githubData: action.payload,
        //     gitStats: action.payload.stats
        //   });
        // // case UPDATE_STUDENT:
        // //   return Object.assign({}, state, {
        // //     updatedStudent: action.payload,
        // //     allStudents: null,
        // //     githubData: null,
        // //     editStudent: null
        // //   });
        // case EDIT_STUDENT:
        //   return Object.assign({}, state, {
        //     editStudent: action.payload
        //   });
        // case REMOVE_STUDENT:
        //   return Object.assign({}, state, {
        //     removedStudent: action.payload,
        //     allStudents: null,
        //     allClasses: null
        //   });

        case ADMIN_REGISTER:
            return Object.assign({}, state, {
                registeredAdmin: action.payload
            });
        case ADMIN_REGISTER_ERRORS:
            return Object.assign({}, state, {
                registerErrors: action.payload
            });
        case ADMIN_LOGIN:
            return Object.assign({}, state, {
                loggedInAdmin : {
                    token: action.payload,
                    username: action.username,
                    email: action.email
                },
                successfulLogin: true

            });
        case ADMIN_LOGIN_ERRORS:
            return Object.assign({}, state, {
                loginErrors: action.payload
            });
        case ADMIN_LOGOUT:
            return Object.assign({}, state, {
                loggedInAdmin: ""
            });

        case GET_ADMIN_ORGANIZATIONS:
            return Object.assign({}, state, {
                adminOrganizations: action.payload
            });
        case ADD_ADMIN_ORGANIZATIONS_ERRORS:
            return Object.assign({}, state, {
                newOrganizationErrors: action.payload
            });
        case ADD_ADMIN_ORGANIZATIONS:
            return Object.assign({}, state, {
                createdOrganization: action.payload
            });
        case DELETE_ORGANIZATION:
            return Object.assign({}, state, {
                deletedOrganization: action.payload
            });

        case GET_ORGANIZATION_CLASSES:
            return Object.assign({}, state, {
                organizationClasses: action.payload
            });
        case ADD_ORGANIZATION_CLASSES_ERRORS:
            return Object.assign({}, state, {
                newClassErrors: action.payload
            });
        case ADD_ORGANIZATION_CLASSES:
            return Object.assign({}, state, {
                createdClass: action.payload
            });

        case GET_CLASS_STUDENTS:
            return Object.assign({}, state, {
                classStudents: action.payload
            });
        case ADD_CLASS_STUDENTS_ERRORS:
            return Object.assign({}, state, {
                newStudentErrors: action.payload
            });
        case ADD_CLASS_STUDENTS:
            return Object.assign({}, state, {
                createdStudent: action.payload
            });

        case UPDATE_STUDENT:
            return Object.assign({}, state, {
                updatedStudent: action.payload
            });
        case DELETE_STUDENT:
            return Object.assign({}, state, {
                deletedStudent: action.payload
            });
        // case CLASS_TO_QUERY:
        //     return Object.assign({}.state, {
        //         classToQuery: action.payload
        //     })
        case CLASS_TO_QUERY:
            return Object.assign({}, state, {
                classToQuery: action.payload,
                githubData: null,
                gitStats: null
            })
        case GET_GITHUB_DATA:
            return Object.assign({}, state, {
                githubData: action.payload,
                gitStats: action.payload.stats
            });
        case CHANGE_SETTINGS:
            return Object.assign({}, state, {
                changeSettings: action.payload
            });
        case UPDATE_ADMIN:
            return Object.assign({}, state, {
                updateAdmin: action.payload
            })

        default:
            return state;
    }
};

export default studentReducer;
