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
import LANDINGPAGE from "./components/LandingPage";
import CREATEUSER from "./components/CreateUser";
import LOGIN from "./components/Login";
import BREADCRUMBS from "./components/Breadcrumbs";
import BILLING from "./components/Billing";

//________STYLING________
import "./App.css";
import CreateEdit from "./components/CreateOrEditClass/CreateEditClass";
require('dotenv').config();

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
          <NAVBAR />

          <Route path="/create-edit" exact component={withRouter(CreateEdit)} />
          <div className="APP__HEADER">
            <div className="APP__BREADCRUMBS">
              <Route path="/" component={BREADCRUMBS} />
            </div>
            <div className="APP__USERHEADER">
              {localStorage.getItem("token") ? (
                <Link onClick={this.handleLogOut} to="/">
                  Log out
                </Link>
              ) : (
                <Link to="/login">Log in</Link>
              )}
            </div>
          </div>
          <div className="APP__CONTENT">
            {localStorage.getItem("token") ? (
              <div className="APP__MENU">
                <MENUBAR />
              </div>
            ) : null}
            <div className="APP__BODY" style={{ height: "100%" }}>
              <Switch>
                {/* TODO ADD MORE COMPONENTS*/}
                <Route exact path="/" component={LANDINGPAGE} />
                <Route path="/login" component={LOGIN} />
                <Route path="/register" component={CREATEUSER} />
                <Route path="/classlist" component={CLASSLIST} />
                <Route path="/billing" component={BILLING} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
