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
    console.log(process.env.REACT_APP_ACCESS_KEY)
    return (
      <Router>
        <div className="APP">
          {console.log("props", this)}
          <Route path="/" component={NAVBAR} />
          <div className="APP__CONTENT">
            <div className="APP__BODY">
              {/*<Switch>*/}
                <Route exact path="/" component={LANDINGPAGE} />
<<<<<<< HEAD
                <Route path="/login" component={LOGIN} />
                <Route path="/register" component={CREATEUSER} />
                <Route path="/classlist" component={CLASSLIST} />
                <Route path="/billing" component={BILLING} />
              </Switch>
=======
                <Route exact path="/classlist" component={CLASSLIST} />
                <Route
                  path="/classlist/:name/"
                  exact
                  component={withRouter(CREATEEDIT)}
                />
              {/*</Switch>*/}
>>>>>>> c7c6ed8986969f8657f399e894af08fce7e3d1db
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
