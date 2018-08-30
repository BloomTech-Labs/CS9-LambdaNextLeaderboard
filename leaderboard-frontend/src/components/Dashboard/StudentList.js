import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

export default class StudentList extends Component {
  render() {
    console.log("STUDNET PROPS", this.props);
    return <Segment>Hello</Segment>;
  }
}
