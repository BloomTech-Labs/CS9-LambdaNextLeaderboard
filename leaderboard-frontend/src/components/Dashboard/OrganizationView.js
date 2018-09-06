import React, { Component } from "react";
import { Segment, List, Button, Modal, Form, Header } from "semantic-ui-react";

export default class OrganizationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditModal: false,
      openConfirm: false,
      confirmationInput: ""
    };
  }

  openEditModal = () => {
    this.setState({ openEditModal: true });
  };

  closeEditModal = () => {
    this.setState({ openEditModal: false });
  };

  openConfirm = () => {
    this.setState({ openConfirm: true });
  };

  closeConfirm = () => {
    this.setState({ openConfirm: false });
  };

  handleInput = (e, { value }) => {
    this.setState({ confirmationInput: value });
  };

  handleDelete = () => {
    this.setState({
      openEditModal: false,
      openConfirm: false,
      confirmationInput: ""
    });
    this.props.delete({ id: this.props.id });
  };

  render() {
    return (
      <Segment.Group>
        <Segment inverted color="blue">
          <Header as="h2" content="Organization View" textAlign="center" />
        </Segment>
        <Segment textAlign="center">
          <Header>{this.props.name}</Header>
          <List bulleted horizontal>
            <List.Item>Number of classes: {this.props.numOfClasses}</List.Item>
          </List>
        </Segment>
        <Segment textAlign="center">
          <Button
            name="openEditModal"
            icon="cog"
            content="Settings"
            inverted
            color="blue"
            size="large"
            onClick={this.openEditModal}
          />
        </Segment>
        <EditModal
          open={this.state.openEditModal}
          close={this.closeEditModal}
          openConfirm={this.openConfirm}
        />
        <ConfirmDeleteModal
          open={this.state.openConfirm}
          close={this.closeConfirm}
          inputValue={this.state.confirmationInput}
          inputChange={this.handleInput}
          name={this.props.name}
          delete={this.handleDelete}
        />
      </Segment.Group>
    );
  }
}

const EditModal = props => {
  return (
    <Modal
      centered
      size="large"
      closeIcon
      open={props.open}
      onClose={props.close}
      dimmer="blurring"
    >
      <Modal.Header icon="cog" content="Organization Settings" />
      <Modal.Content content="Billing options or current subscription details." />
      <Modal.Actions>
        <Button
          color="red"
          icon="trash alternate"
          content="Delete this Organization"
          onClick={props.openConfirm}
        />
      </Modal.Actions>
    </Modal>
  );
};

const ConfirmDeleteModal = props => {
  return (
    <Modal
      centered
      size="tiny"
      closeIcon
      open={props.open}
      onClose={props.close}
    >
      <Modal.Header icon="trash" content="Are you absolutely sure?" />
      <Modal.Content>
        <Form>
          <Form.Input
            label="Deleting this organization will delete all of the organization's classes and
            students."
            placeholder="Enter the name of the organization to confirm."
            value={props.inputValue}
            onChange={props.inputChange}
            fluid
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          icon="trash alternate"
          content="Confirm Delete"
          disabled={props.inputValue !== props.name}
          onClick={props.delete}
        />
      </Modal.Actions>
    </Modal>
  );
};
