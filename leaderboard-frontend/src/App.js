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
import MENUBAR from "./components/MenuBar";
import CLASSLIST from "./components/ClassList";
import LANDINGPAGE from "./components/LandingPage/LandingPage";
// import BILLING from "./components/Billing";

//________STYLING________
import "./App.css";
import CreateEdit from "./components/CreateOrEditClass/CreateEditClass";
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
              {/* TODO ADD MORE COMPONENTS*/}
              <Route exact path="/" component={LANDINGPAGE} />
              <Route exact path="/classlist" component={CLASSLIST} />
              <Route
                path="/classlist/:name/"
                exact
                component={withRouter(CreateEdit)}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
