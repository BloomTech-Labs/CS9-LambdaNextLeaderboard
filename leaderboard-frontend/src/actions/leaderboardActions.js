const LEADERBOARD_URL = process.env.REACT_APP_LEADERBOARD_URL;

export const getGithubDataAction = () => {
  const token = localStorage.getItem("token");
  const id = {
    // id: localStorage.getItem("adminID")
    id: "5b89b5b5bf794029f43b4869"
  };
  return dispatch => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: token },
      url: `${LEADERBOARD_URL}data`,
      data: id
    };
    axios(options)
      .then(res => {
        localStorage.removeItem("invalid");
        dispatch({
          type: GET_GITHUB_DATA,
          payload: res.data,
          githubStats: res.data
        });
      })
      .catch(err => {
        localStorage.setItem("invalid", err.response.data);
        dispatch({
          type: ERRORS,
          payload: err.response.data
          // allClasses: err.response.data,
          // allClasses ? (allClasses: action.allClasses ): (allClasses:  allClasses)
        });
      });
  };
};