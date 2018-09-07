import axios from "axios";
import jwt from "jsonwebtoken";

export const GET_ORGANIZATION_CLASSES = "GET_ORGANIZATION_CLASSES";
export const ADD_ORGANIZATION_CLASSES = "ADD_ORGANIZATION_CLASSES";
export const ADD_ORGANIZATION_CLASSES_ERRORS =
  "ADD_ORGANIZATION_CLASSES_ERRORS";
export const DELETE_ORGANIZATION = "DELETE_ORGANIZATION";
export const ADD_STRIPE_CUSTOMER_ID = "ADD_STRIPE_CUSTOMER_ID";
export const ACTIVE_ORGANIZATION = "ACTIVE_ORGANIZATION";
export const GET_SUBSCRIPTION_INFO = "GET_SUBSCRIPTION_INFO";
export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS"
const ORGANIZATION_URL = process.env.REACT_APP_ORGANIZATION_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export const getSubscriptionInfo = id => {
  return dispatch => {
    fetch('http://localhost:4000/api/customer/retrieve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stripe_customer_id: id
        })
      }).then((res) => res.json()).then((response) => {
        console.log('response', response)
        dispatch({
          type: GET_SUBSCRIPTION_INFO,
          payload: response.subscriptions.data[0].plan.active,
          nickname: response.subscriptions.data[0].plan.nickname,
          period_start: response.subscriptions.data[0].current_period_start,
          period_end: response.subscriptions.data[0].current_period_end
        })
      }).catch(err => {
        dispatch({
          type: "ERRORS",
          payload: err.response
        });
      });
  }
}
export const toggleSettings = boolean => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SETTINGS,
      payload: boolean
    })

  }
}

export const getOrganizationClasses = obj => {
  return dispatch => {
    axios
      .get(`${ORGANIZATION_URL}${obj.id}/classes`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token
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

// export const stripeCustomerID =

export const activeOrganization = (id, stripe) => {
  console.log('active', id, stripe)
  if (stripe) {
    const values = getSubscriptionInfo(stripe)
    console.log("activeOrganiation ACTION:", values);
  }
  return dispatch => {
    dispatch({
      type: ACTIVE_ORGANIZATION,
      payload: id,
      stripeCustomerID: stripe
    })
  }

}

export const addOrganizationClass = obj => {
  const token = localStorage.token;
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
          type: ADD_ORGANIZATION_CLASSES,
          payload: res.data
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

export const deleteOrganization = obj => {
  return dispatch => {
    axios
      .delete(`${ORGANIZATION_URL}${obj.id}/delete`, {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.token
        }
      })
      .then(res => {
        dispatch({ type: DELETE_ORGANIZATION, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "ERRORS", payload: err.response.data });
      });
  };
};
