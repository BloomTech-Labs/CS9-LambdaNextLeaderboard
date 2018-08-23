//________MODULES________
import React, { Component } from "react";

//________STYLING________
import "./Breadcrumbs.css";

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location.pathname.split(/\/(\w+)/g), // grab path from props
    };
  }
  render() {
    return (
      <div className="APP__BREADCRUMBS">
      {this.state.location.map((loc, index) => {  // Map through location
        if(loc.length > 0) { // Choose only the words
          return(
            <div className="APP__CRUMB" key={`loc${index}`}>
              <p>&#9755; {loc}</p>  {/*return each word with an arrow pointing right*/}
            </div>
          )
        }
      })}
      </div>
    );
  }
}

export default Breadcrumbs;
