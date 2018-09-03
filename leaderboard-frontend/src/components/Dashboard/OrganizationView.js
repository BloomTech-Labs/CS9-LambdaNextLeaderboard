import React, { Component } from "react";
import { Segment, Card, List, Button, Modal, Header } from "semantic-ui-react";

export default class OrganizationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditModal: false
    };
  }

  openModal = () => {
    this.setState({ openEditModal: true });
  };

  closeModal = () => {
    this.setState({ openEditModal: false });
  };

  handleDelete = () => {
    this.setState({ openEditModal: false });
    this.props.delete({ id: this.props.id });
  };

  render() {
    return (
      <Segment.Group>
        <EditModal
          open={this.state.openEditModal}
          close={this.closeModal}
          delete={this.handleDelete}
        />
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
                onClick={this.openModal}
              />
            </Card.Content>
          </Card>
        </Segment>
      </Segment.Group>
    );
  }
}

const EditModal = props => {
  return (
    <Modal
      centered
      size="small"
      closeIcon
      open={props.open}
      onClose={props.close}
      dimmer="blurring"
    >
      <Header icon="cog" content="Organization Settings" />
      <Modal.Content content="Hello" />
      <Modal.Actions>
        <Button
          color="red"
          icon="trash alternate"
          content="Delete this Organization"
          onClick={props.delete}
        />
      </Modal.Actions>
    </Modal>
  );
};
