//________MODULES________
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//________REACT COMPONENTS________
import NAVBAR from "./components/Navbar/Nav";
import LANDINGPAGE from "./components/LandingPage/LandingPage";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import BILLING from "./components/Billing/Billing";
import Dashboard from "./components/Dashboard/Dashboard";

//________STYLING________

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openNavModal = () => {
    this.nav.handleOpenModal(null, { content: "Register" });
  };

  render() {
    return (
      <Router>
        <div className="APP">
          {/* onRef gives App has access to Navbar methods   Ex: this.nav.handleLogout() */}
          <NAVBAR onRef={ref => (this.nav = ref)} />
          <div className="APP__BODY">
            <Route exact path="/" component={LANDINGPAGE} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/billing" component={BILLING} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <button onClick={this.openNavModal}>oh don't do it</button>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
