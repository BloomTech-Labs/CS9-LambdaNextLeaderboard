import axios from "axios";

export const CREATE_USER = "CREATE_USER";
export const LOGIN_ACTION = "LOGIN_ACTION";
export const UPDATE_USER = "UPDATE_USER";

export const ADD_CLASS = "ADD_CLASS";
export const ADD_STUDENT = "ADD_STUDENT";
export const GET_CLASS_STUDENTS = "GET_CLASS_STUDENTS";
export const LOGIN_ERRORS = "LOGIN_ERRORS";
export const REGISTER_ERRORS = "REGISTER_ERRORS";
export const ERRORS = "ERRORS";

//LOCAL SERVER SETUP
// const USER_URL = "http://localhost:4000/api/users/";
// const CLASS_URL = "http://localhost:4000/api/classes/";

//DEPLOYED SERVER SETUP
const USER_URL = "https://labs-next-leaderboard.herokuapp.com/api/users/";
const CLASS_URL = "https://labs-next-leaderboard.herokuapp.com/api/classes/";

export function queryMyData(param, history) {
  return (dispatch, getState) => {
    console.log(param, history);
    const data = getState().classlist_students; //path.to.myData[param];
    console.log("DATA DATA DATA", data);
    const status = data ? "complete" : "loading";
    console.log("status", status);
    const promise = data
      ? Promise.resolve
      : dispatch(getClassStudentsAction(param.toString()));

    return { data, status, promise };
  };
}

export const createUserAction = obj => {
  return dispatch => {
    axios
      .post(`${USER_URL}register`, obj)
      .then(resp => {
        dispatch({
          type: CREATE_USER,
          username: resp.data.username,
          user_id: resp.data._id
        });
      })
      .catch(err => {
        dispatch({
          type: REGISTER_ERRORS,
          payload: err.response.data
        });
      });
  };
};
export const addClassAction = obj => {
  //obj {
  //     "name": "CS9"
  // }
  const token = localStorage.getItem("token");
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      data: obj,
      url: `${CLASS_URL}addClass/addStudent`
    };
    axios
      .post(`${CLASS_URL}addClass`, obj)
      .then(res => {
        dispatch({
          type: ADD_CLASS,
          payload: res.name,
          students: res.students
        });
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};
export const addStudentAction = (classname, studentData) => {
  //STUDENT DATA {
  //     "lastname": "Bueno",
  //     "firstname": "Abraham",
  //     "email": "abrambueno1992@gmail.com",
  //     "github": "abrambueno1992",
  //     "huntr": "abrambueno1992@gmail.com"
  // }
  const token = localStorage.getItem("token");
  const user = studentData.firstname + " " + studentData.lastname;
  return dispatch => {
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json", Authorization: token },
      data: studentData,
      url: `${CLASS_URL}${classname}/addStudent`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_STUDENT,
          payload: res.students, //Student data object returned
          class_name: res.name,
          user: user
        });
        //RESPONSE DATA {
        //     "_id": "5b79b366223c9800043f5a1d",
        //     "name": "CS9",
        //     "students": [
        //     {
        //         "hired": false,
        //         "_id": "5b79b4a6223c9800043f5a1e",
        //         "lastname": "Bueno",
        //         "firstname": "Abraham",
        //         "email": "abrambueno1992@gmail.com",
        //         "github": "abrambueno1992",
        //         "huntr": "abrambueno1992@gmail.com"
        //     },
        //     {
        //         "hired": false,
        //         "_id": "5b79e913e4056e00046b549d",
        //         "lastname": "Bueno",
        //         "firstname": "Abraham",
        //         "email": "abrambueno1992@gmail.com",
        //         "github": "abrambueno1992",
        //         "huntr": "abrambueno1992@gmail.com"
        //     }
        // ],
        //     "__v": 2
        // }
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};
export const getClassStudentsAction = classname => {
  const token = localStorage.getItem("token");

  return dispatch => {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json", Authorization: token },
      url: `${CLASS_URL}${classname}`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: GET_CLASS_STUDENTS,
          payload: res.data.students, //returns the array of student object data
          class_name: res.data.name,
          test: res
          //PAYLOAD {
          //     "hired": false,
          //     "_id": "5b79b4a6223c9800043f5a1e",
          //     "lastname": "Bueno",
          //     "firstname": "Abraham",
          //     "email": "abrambueno1992@gmail.com",
          //     "github": "abrambueno1992",
          //     "huntr": "abrambueno1992@gmail.com"
          // }
        });
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const loginAction = (obj, history) => {
  return dispatch => {
    axios
      .post(`${USER_URL}login`, obj)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem('expiration', expire);
        dispatch({
          type: LOGIN_ACTION,
          successfulLogin: res.data.success,
          payload: res.data.token,
          username: res.data.username
          // expiration: expire// (Math.floor(Date.now() / 1000) + (60*60))
        });
        //Need to get the correct redirect
        // history.push("/");
        // window.location.reload();
      })
      .catch(err => {
        localStorage.removeItem("token");
        dispatch({ type: LOGIN_ERRORS, payload: err.response.data });
      });
  };
};

// export const addClass = obj => {
//     const token = localStorage.getItem("token");
//     return dispatch => {
//         const optionTwo = {
//             method: "POST",
//             headers: {"content-type": "application/json", Authorization: token},
//             data: obj,
//             url: `${CLASS_URL}addclass`
//         };
//
//         axios(optionTwo)
//             .then(resp => {
//                 localStorage.setItem("user", resp.data.name);
//                 dispatch({
//                     type: ADD_CLASS,
//                     user: resp.data.name,
//                     class_name: resp.student
//                 });
//             })
//             .catch(err => dispatch({type: ERRORS, payload: err}));
//     };
// };
// export const addStudent = obj => {
//     const token = localStorage.getItem("token");
//     return dispatch => {
//         const optionTwo = {
//             method: "PUT",
//             headers: {"content-type": "application/json", Authorization: token},
//             data: obj,
//             url: `${USER_URL}addclass`
//         };
//
//         axios(optionTwo)
//             .then(resp => {
//                 // localStorage.setItem('user', resp.data.name)
//                 dispatch({
//                     type: ADD_STUDENT,
//                     user: resp.data.name,
//                     class_name: resp.student
//                 });
//             })
//             .catch(err => dispatch({type: ERRORS, payload: err}));
//     };
// };
