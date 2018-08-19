//________MODULES________
import { connect } from "react-redux";
import { CREATE_USER, LOGIN_ACTION, UPDATE_USER, ERRORS } from "./actions";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// TODO import axios from 'axios';

//________REACT COMPONENTS________
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

          <Route exact path="/create-edit" component={CreateEdit} />
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
            <div className="APP__BODY" style={{height: '100%'}} >
              <Switch>
                  {/* TODO ADD MORE COMPONENTS*/}
                  <Route exact path="/" component={LANDINGPAGE} />
                <Route path="/login" component={LOGIN} />
                <Route path="/register" component={CREATEUSER} />
                <Route path="/classlist" component={CLASSLIST} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes
  };
};

export default connect(
  mapStateToProps,
  { CREATE_USER, LOGIN_ACTION, UPDATE_USER, ERRORS }
)(App);
