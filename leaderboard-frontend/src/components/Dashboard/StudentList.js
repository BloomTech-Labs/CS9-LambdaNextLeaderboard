import React, { Component } from "react";
import { Segment, Card, Button, List } from "semantic-ui-react";

export default class StudentList extends Component {
  render() {
    console.log("STUDNET PROPS", this.props);
    return (
      <Segment>
        <Card.Group itemsPerRow="2" stackable>
          {this.props.students.map((student, index) => {
            return (
              <Card key={index}>
                <Card.Content>
                  <Card.Header>{`${student.firstname} ${
                    student.lastname
                  }`}</Card.Header>
                  <Card.Description>
                    <List>
                      <List.Item>Email Address: {student.email}</List.Item>
                      <List.Item>Github Handle: {student.github}</List.Item>
                      <List.Item>Huntr Handle: {student.huntr}</List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    icon="money"
                    content="Hired"
                    inverted
                    color="green"
                    size="small"
                    disabled
                  />
                  <Button
                    icon="wrench"
                    content="Edit"
                    inverted
                    color="blue"
                    size="small"
                    disabled
                  />
                  <Button
                    icon="trash"
                    content="Delete"
                    inverted
                    color="red"
                    size="small"
                    disabled
                  />
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </Segment>
    );
  }
}
