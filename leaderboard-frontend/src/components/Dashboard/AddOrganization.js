import React, { Component } from "react";
import { Segment, Header, Icon, Form, Label } from "semantic-ui-react";
import jwt from "jsonwebtoken";

export default class AddOrganization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrgName: ""
    };
  }

  handleInput = (e, { value }) => {
    this.setState({ newOrgName: value });
    this.props.addOrgErrors.name = "";
  };

  handleSubmit = () => {
    const id = jwt.decode(localStorage.token.split(" ")[1]).id;
    this.props.addOrg({ id, name: this.state.newOrgName });
    this.props.getOrgs({ id });
  };

  render() {
    return (
      <Segment>
        <Header as="h2" icon textAlign="center" size="huge">
          <Icon name="users" circular />
          <Header.Content>Add New Organization</Header.Content>
        </Header>

        <Segment>
          <Form>
            <Form.Field error={Boolean(this.props.addOrgErrors.name)}>
              {this.props.addOrgErrors.name ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addOrgErrors.name}
                />
              ) : null}
              <Form.Input
                placeholder="New organization name"
                onChange={this.handleInput}
              />
              <Form.Button
                content="Create my organization"
                color="green"
                onClick={this.handleSubmit}
              />
            </Form.Field>
          </Form>
        </Segment>
      </Segment>
    );
  }
}
