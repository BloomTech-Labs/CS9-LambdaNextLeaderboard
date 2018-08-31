import React, { Component } from "react";
import {
  Segment,
  Card,
  Button,
  List,
  Modal,
  Header,
  Icon
} from "semantic-ui-react";

export default class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStudent: "",
      deleteModalOpen: false
    };
  }

  openModal = (e, { id, name }) => {
    this.setState({ [name]: !this.state[name], selectedStudent: id });
  };

  closeDeleteModal = () => {
    this.setState({ deleteModalOpen: false, selectedStudent: "" });
  };

  handleHire = (e, { name }) => {
    this.props.updateStudent({ id: name, hired: true });
  };

  handleDelete = () => {
    this.props.deleteStudent({ id: this.state.selectedStudent });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("studentlist", this.props, prevProps);
  };

  render() {
    console.log("student list", this.props.students);
    return (
      <Segment>
        <DeleteModal
          open={this.state.deleteModalOpen}
          close={this.closeDeleteModal}
          selected={this.state.selectedStudent}
          delete={this.handleDelete}
        />
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
                    </List>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    name={student._id}
                    icon="money"
                    content="Hired"
                    inverted
                    color="green"
                    size="small"
                    onClick={this.handleHire}
                  />
                  <Button
                    name={student._id}
                    icon="wrench"
                    content="Edit"
                    inverted
                    color="blue"
                    size="small"
                    disabled
                  />
                  <Button
                    id={student._id}
                    name="deleteModalOpen"
                    icon="trash"
                    content="Delete"
                    inverted
                    color="red"
                    size="small"
                    onClick={this.openModal}
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

const DeleteModal = props => {
  return (
    <Modal
      centered
      size="small"
      closeIcon
      open={props.open}
      onClose={props.close}
    >
      <Header icon="trash" content="Delete Student" />
      <Modal.Content>
        Are you sure you want to delete this student?
      </Modal.Content>
      <Modal.Actions onClick={props.close}>
        <Button color="red" onClick={props.delete}>
          <Icon name="trash alternate" />
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
