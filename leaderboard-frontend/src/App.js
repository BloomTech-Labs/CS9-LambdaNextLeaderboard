//________MODULES________
import { connect } from "react-redux";
import { CREATE_USER, LOGIN_ACTION, UPDATE_USER, ERRORS } from "./actions";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// TODO import axios from 'axios';

//________REACT COMPONENTS________
import MENUBAR from "./components/MenuBar";
import CLASSLIST from "./components/ClassList";
import LANDINGPAGE from "./components/LandingPage";
import CREATEUSER from "./components/CreateUser";
import LOGIN from "./components/Login";
import LEADERBOARD from './components/LeaderBoard';

//________STYLING________
import "./App.css";
import CreateEdit from "./components/CreateOrEditClass/CreateEditClass";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
      // TODO users: [],
    };
    // TODO this.storage = window.localStorage;
  }

  componentWillMount() {
    console.log("Going to mount");
  }

  componentWillUpdate() {
    console.log("going to update");
  }

  render() {
    return (
      <Router>
        <div className="APP">
          <div className="APP__HEADER">
            <div className="APP__BREADCRUMBS">
              BREAD CRUMBS -> BREAD CRUMBS -> BREAD CRUMBS
              {/* TODO ADD BREADCRUMB COMPONENT*/}
            </div>
            <div className="APP__USERHEADER">
              SIGN IN / SIGN OUT
              {/* TODO ADD LOGIN LINK COMPONENT*/}
            </div>
          </div>
          {/* TODO BREAD CRUMB BAR GOES HERE */}
          <div className="APP__CONTENT">
            {localStorage.getItem("token") ? (
              <div className="APP__MENU">
                <MENUBAR />
              </div>
            ) : null}
            <div className="APP__BODY">
              <Switch>
                <Route exact path="/" component={LANDINGPAGE} />
                <Route path="/login" component={LOGIN} />
                <Route path="/create-edit" component={CreateEdit} />
                <Route path="/register" component={CREATEUSER} />
                <Route path="/classlist" component={CLASSLIST} />
                <Route path="/leaderboard" component={LEADERBOARD} />

                
                {/* TODO ADD MORE COMPONENTS*/}
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
