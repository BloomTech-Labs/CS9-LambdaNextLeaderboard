import React, { Component } from "react";
import { Segment, Card, List, Button } from "semantic-ui-react";

export default class OrganizationView extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment>
          <Card fluid color="orange">
            <Card.Content textAlign="center">
              <Card.Header>{this.props.name}</Card.Header>
              <List bulleted horizontal>
                <List.Item>
                  Number of classes: {this.props.numOfClasses}
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content textAlign="center" extra>
              <Button
                icon="cog"
                content="Settings"
                inverted
                color="blue"
                size="large"
                disabled
              />
            </Card.Content>
          </Card>
        </Segment>
      </Segment.Group>
    );
  }
}
