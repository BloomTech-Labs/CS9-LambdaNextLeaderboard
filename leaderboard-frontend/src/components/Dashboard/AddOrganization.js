import React, { Component } from "react";
import { Segment, Header, Icon, Form } from "semantic-ui-react";

export default class AddOrganization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrgName: ""
    };
  }

  handleInput = (e, { value }) => {
    this.setState({ newOrgName: value });
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
            <Form.Input
              placeholder="New organization name"
              onChange={this.handleInput}
            />
            <Form.Button
              content="Create my organization"
              color="green"
              onClick={this.handleSubmit}
            />
          </Form>
        </Segment>
      </Segment>
    );
  }
}
