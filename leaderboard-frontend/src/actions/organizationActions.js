import axios from "axios";
import jwt from "jsonwebtoken";

export const GET_ORGANIZATION_CLASSES = "GET_ORGANIZATION_CLASSES";
export const ADD_ORGANIZATION_CLASSES = "ADD_ORGANIZATION_CLASSES";
export const ADD_ORGANIZATION_CLASSES_ERRORS =
  "ADD_ORGANIZATION_CLASSES_ERRORS";

const ORGANIZATION_URL = process.env.REACT_APP_ORGANIZATION_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const getOrganizationClasses = obj => {
  return dispatch => {
    axios
      .get(`${ORGANIZATION_URL}${obj.id}/classes`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        dispatch({
          type: GET_ORGANIZATION_CLASSES,
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

export const addOrganizationClass = obj => {
  const token = localStorage.getItem("token");
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      data: { token: dataEncrypt(obj) },
      url: `${ORGANIZATION_URL}${obj.id}/classes/create`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_ORGANIZATION_CLASSES
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_ORGANIZATION_CLASSES_ERRORS,
          payload: err.response.data
        });
      });
  };
};
