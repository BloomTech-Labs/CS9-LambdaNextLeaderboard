import React, { Component } from "react";
import { Segment, Header, Icon, Form, Label } from "semantic-ui-react";

export default class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      github: "",
      huntr: ""
    };
  }

  handleInput = (e, { name, value }) => {
    this.setState({ [name]: value });
    // this.props.addOrgErrors.name = "";
    this.props.addStudentErrors[name] = "";
  };

  handleSubmit = () => {
    this.props.addStudent({
      id: this.props.classId,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      github: this.state.github,
      huntr: this.state.huntr
    });
  };

  render() {
    return (
      <Segment>
        <Header as="h2" icon textAlign="center" size="huge">
          <Icon name="user" circular />
          <Header.Content>Add New Student</Header.Content>
        </Header>

        <Segment>
          <Form>
            <Form.Field error={Boolean(this.props.addStudentErrors.firstname)}>
              {this.props.addStudentErrors.firstname ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addStudentErrors.firstname}
                />
              ) : null}
              <Form.Input
                name="firstname"
                placeholder="First name"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Form.Field error={Boolean(this.props.addStudentErrors.lastname)}>
              {this.props.addStudentErrors.lastname ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addStudentErrors.lastname}
                />
              ) : null}
              <Form.Input
                name="lastname"
                placeholder="Last name"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Form.Field error={Boolean(this.props.addStudentErrors.email)}>
              {this.props.addStudentErrors.email ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addStudentErrors.email}
                />
              ) : null}
              <Form.Input
                name="email"
                placeholder="Email address"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Form.Field error={Boolean(this.props.addStudentErrors.github)}>
              {this.props.addStudentErrors.github ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addStudentErrors.github}
                />
              ) : null}
              <Form.Input
                name="github"
                placeholder="Github handle"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Form.Field error={Boolean(this.props.addStudentErrors.huntr)}>
              {this.props.addStudentErrors.huntr ? (
                <Label
                  color="red"
                  pointing="below"
                  content={this.props.addStudentErrors.huntr}
                />
              ) : null}
              <Form.Input
                name="huntr"
                placeholder="Huntr handle"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Form.Field>
              <Form.Button
                content="Create new student"
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
