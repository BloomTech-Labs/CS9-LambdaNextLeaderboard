//________MODULES________
import React, { Component } from "react";
import {Link} from 'react-router-dom'

//________STYLING________
import "./MenuBar.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Menu-Bar">
        <div className="Menu-Item">Class</div>
          <Link to="/billing">
              <div className="Menu-Item">Billing</div>

          </Link>
        <div className="Menu-Item">Settings</div>
      </div>
    );
  }
}

export default MenuBar;
