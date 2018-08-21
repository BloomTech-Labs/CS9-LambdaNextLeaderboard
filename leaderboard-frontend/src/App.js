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
import CLASSLIST from "./components/Classlist/ClassList";
import LANDINGPAGE from "./components/LandingPage/LandingPage";
import CREATEEDIT from "./components/CreateOrEditClass/CreateEditClass";
// import BILLING from "./components/Billing";

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
    return (
      <Router>
        <div className="APP">
          {console.log("props", this)}
          <NAVBAR />
          <div className="APP__CONTENT">
            <div className="APP__BODY">
              <Switch>
                <Route exact path="/" component={LANDINGPAGE} />
                <Route exact path="/classlist" component={CLASSLIST} />
                <Route
                  path="/classlist/:name/"
                  exact
                  component={withRouter(CREATEEDIT)}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
