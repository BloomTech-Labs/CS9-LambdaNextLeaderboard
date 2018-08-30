import React, { Component } from "react";
import { Segment, Card } from "semantic-ui-react";

export default class StudentList extends Component {
  render() {
    console.log("STUDNET PROPS", this.props);
    return (
      <Segment>
        <Card.Group itemsPerRow="3">
          {this.props.students.map(student => {
            return (
              <Card>
                <Card.Content>
                  <Card.Header>{`${student.firstname} ${
                    student.lastname
                  }`}</Card.Header>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </Segment>
    );
  }
}
