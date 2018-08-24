import {
    LOGIN_ACTION,
    LOGOUT_ACTION,
    CREATE_USER,
    // UPDATE_USER,
    ADD_CLASS,
    ADD_STUDENT,
    GET_CLASS_STUDENTS,
    GET_CLASSES_STUDENTS,
    LOGIN_ERRORS,
    REGISTER_ERRORS,
    ERRORS,
    REDIRECT_DATA_CLASS,
    GET_STUDENTS
} from "../actions/";

const initialState = {
    loginErrors: {},
    registerErrors: {},
    error: {},
    registered_user: null,
    successfulRegister: false,
    user_logged_in: null,
    successfulLogin: false,
    updateCheck: false,
    created_class: null,
    added_student: null,
    classlist_students: null,
    allClasses: null,
    allStudents: null,
    fetchSuccess: false,
    fetchClasses: null
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return Object.assign({}, state, {
                username: action.payload,
                successfulRegister: action.successfulRegister
            });
        case LOGIN_ACTION:
            return Object.assign({}, state, {
                user_logged_in: {
                    ...state.user,
                    token: action.payload,
                    username: action.username,
                    id: action.id
                },
                successfulLogin: action.successfulLogin
                // expiration: action.expiration
                // error: {}
            });
        case LOGOUT_ACTION:
            return Object.assign({}, state, {
                successfulLogin: action.successfulLogin
            });
        case LOGIN_ERRORS:
            return Object.assign({}, state, {
                loginErrors: action.payload
            });
        case REGISTER_ERRORS:
            return Object.assign({}, state, {
                registerErrors: action.payload
            });
        case ERRORS:
            return Object.assign({}, state, {
                errors: action.payload
            });
        // case ADD_CLASS:
        //     return Object.assign({}, state, {
        //         students: {...state.user, username: action.user},
        //         class: action.class_name
        //     });
        //When we fetch data, we need to set updateCheck to False
        //It should be set on the first get request, after the login.
        case ADD_CLASS:
            return Object.assign({}, state, {
                created_class: {
                    classname: action.payload,
                    students: action.students
                },
                allClasses: null
            });
        case ADD_STUDENT:
            return Object.assign({}, state, {
                added_student: {
                    user: action.user,
                    className: action.class_name,
                    students: action.payload
                },
                allClasses: null,
                classlist_students: null
            });
        case GET_CLASS_STUDENTS:
            return Object.assign({}, state, {
                classlist_students: {
                    className: action.class_name,
                    students: action.payload
                },
                test: action.test,
                updateCheck: false
            });
        case GET_CLASSES_STUDENTS:
            return Object.assign({}, state, {
                allClasses: action.payload,
                fetchClasses: action.fetchClasses
            });
        case REDIRECT_DATA_CLASS:
            return Object.assign({}, state, {
                classlist_students: action.classlist_students,
                allClasses: action.allClasses
            });
        case GET_STUDENTS:
            return Object.assign({}, state, {
                allStudents: action.payload
            })
        default:
            return state;
    }
};

export default studentReducer;
