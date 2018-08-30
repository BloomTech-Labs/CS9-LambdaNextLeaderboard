import React, { Component } from "react";
import { Segment, Header, Icon, Form, Label } from "semantic-ui-react";

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
    this.props.addOrg({ name: this.state.newOrgName });
  };

  render() {
    console.log("state", this.state, "props", this.props);
    return (
      <Segment>
        <Header as="h2" icon textAlign="center" size="huge">
          <Icon name="users" circular />
          <Header.Content>New Organization</Header.Content>
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
