import axios from "axios";
import jwt from "jsonwebtoken";

export const GET_CLASS_STUDENTS = "GET_CLASS_STUDENTS";
export const ADD_CLASS_STUDENTS = "ADD_CLASS_STUDENTS";
export const ADD_CLASS_STUDENTS_ERRORS = "ADD_CLASS_STUDENTS_ERRORS";

const CLASS_URL = process.env.REACT_APP_CLASS_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const getClassStudents = obj => {
  return dispatch => {
    axios
      .get(`${CLASS_URL}${obj.id}/students`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        dispatch({
          type: GET_CLASS_STUDENTS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: "ERRORS",
          payload: err.response.data
        });
      });
  };
};

export const addClassStudent = obj => {
  const token = localStorage.getItem("token");
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      data: { token: dataEncrypt(obj) },
      url: `${CLASS_URL}${obj.id}/students/create`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_CLASS_STUDENTS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_CLASS_STUDENTS_ERRORS,
          payload: err.response.data
        });
      });
  };
};
