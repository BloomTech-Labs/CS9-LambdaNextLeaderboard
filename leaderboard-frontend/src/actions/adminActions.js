import axios from "axios";
import jwt from "jsonwebtoken";

export const GET_ADMIN_ORGANIZATIONS = "GET_ADMIN_ORGANIZATIONS";
export const ADD_ADMIN_ORGANIZATIONS = "ADD_ADMIN_ORGANIZATIONS";

const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const getAdminOrganizations = obj => {
  return dispatch => {
    axios
      .get(`${ADMIN_URL}${localStorage.getItem("adminID")}/organizations`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        dispatch({
          type: GET_ADMIN_ORGANIZATIONS,
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

export const addAdminOrganization = obj => {
  const token = localStorage.getItem("token");
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      data: { token: dataEncrypt(obj) },
      url: `${ADMIN_URL}${localStorage.getItem("adminID")}/organizations/create`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_ADMIN_ORGANIZATIONS
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "Errors",
          payload: err
        });
      });
  };
};
