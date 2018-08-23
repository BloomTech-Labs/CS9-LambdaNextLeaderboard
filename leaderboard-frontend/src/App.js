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
import LEADERBOARD from './components/LeaderBoard';
import BREADCRUMBS from "./components/Breadcrumbs";
import BILLING from "./components/Billing";
import CreateEdit from "./components/CreateOrEditClass/CreateEditClass";
// >>>>>>> 2923438da58bf025d6659036e9ee9ab6d0707998

//________STYLING________
import "./App.css";

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
{/* <<<<<<< HEAD */}
                <Route path="/leaderboard" component={LEADERBOARD} />

                
                {/* TODO ADD MORE COMPONENTS*/}
=======
{/* >>>>>>> 2923438da58bf025d6659036e9ee9ab6d0707998 */}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
