//________MODULES________
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
// TODO import axios from 'axios';

//________REACT COMPONENTS________
import NAVBAR from "./components/Navbar/Nav";
import CLASSLIST from "./components/Classlist/index";
import LANDINGPAGE from "./components/LandingPage/LandingPage";
import CREATEEDIT from "./components/CreateOrEditClass/CreateEditClass";
import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/OverallLeaderboard";
import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/WeeklyLeaderboard";
import LEADERBOARDCOMPONENTS from "./components/LeaderboardComponents/ActivityFeed";
import BILLING from "./components/Billing/Billing";

//________STYLING________
import "./App.css";
require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  render() {
    console.log(process.env.REACT_APP_ACCESS_KEY);
    return (
      <Router>
        <div className="APP">
          {console.log("props", this)}
          <Route path="/" component={NAVBAR} />
          <div className="APP__CONTENT">
            <div className="APP__BODY">
              {/*<Switch>*/}
              <Route exact path="/" component={LANDINGPAGE} />
              <Route exact path="/classlist" component={CLASSLIST} />
              <Route
                path="/classlist/:name/"
                exact
                component={withRouter(CREATEEDIT)}
              />
              <Route exact path="/billing" component={BILLING} />
              {/*</Switch>*/}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
