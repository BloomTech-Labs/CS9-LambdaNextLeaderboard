import React, { Component } from "react";
import {
  Segment,
  Card,
  Button,
  List,
  Modal,
  Header,
  Icon,
  Input
} from "semantic-ui-react";

export default class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStudent: "",
      editStudent: false,
      openDeleteModal: false,
      updatedInfo: {}
    };
  }

  openModal = (e, { id }) => {
    this.setState({ openDeleteModal: true, selectedStudent: id });
  };

  closeModal = () => {
    this.setState({
      openDeleteModal: false,
      selectedStudent: ""
    });
  };

  componentWillUpdate(nextProps, nextState) {}

  handleHire = (e, { id }) => {
    this.props.updateStudent({ id, hired: true });
  };

  openEditView = (e, { student }) => {
    let current = {};
    current.id = student._id;
    current.firstname = student.firstname;
    current.lastname = student.lastname;
    current.email = student.email;
    current.github = student.github;
    this.setState({
      editStudent: true,
      selectedStudent: student._id,
      updatedInfo: current
    });
  };

  closeEditView = () => {
    this.setState({ editStudent: false, selectedStudent: "", updatedInfo: {} });
  };

  handleInput = (e, { name, value }) => {
    let current = Object.assign({}, this.state.updatedInfo);
    current[name] = value;
    this.setState({ updatedInfo: current });
  };

  handleUpdate = () => {
    this.props.updateStudent(this.state.updatedInfo);
    this.closeEditView();
  };

  handleDelete = () => {
    this.props.deleteStudent({ id: this.state.selectedStudent });
  };

  render() {
    console.log(this.state);
    return (
      <Segment>
        <DeleteModal
          open={this.state.openDeleteModal}
          close={this.closeModal}
          selected={this.state.selectedStudent}
          delete={this.handleDelete}
        />
        <Card.Group itemsPerRow="1" stackable>
          {this.props.students.map((student, index) => {
            return !student.hired ? (
              this.state.editStudent &&
              this.state.selectedStudent === student._id ? (
                <Card key={index}>
                  <Card.Content>
                    <Input
                      name="firstname"
                      placeholder="Student first name"
                      value={this.state.updatedInfo.firstname}
                      onChange={this.handleInput}
                      fluid
                    />
                    <Input
                      name="lastname"
                      placeholder="Student last name"
                      value={this.state.updatedInfo.lastname}
                      onChange={this.handleInput}
                      fluid
                    />
                    <Input
                      name="email"
                      placeholder="Student email address"
                      value={this.state.updatedInfo.email}
                      onChange={this.handleInput}
                      fluid
                    />
                    <Input
                      name="github"
                      placeholder="Student Github handle"
                      value={this.state.updatedInfo.github}
                      onChange={this.handleInput}
                      fluid
                    />
                  </Card.Content>
                  <Card.Content extra>
                    <Button.Group widths="2">
                      <Button
                        id={student._id}
                        content="Update"
                        onClick={this.handleUpdate}
                        color="blue"
                        inverted
                      />
                      <Button
                        content="Cancel"
                        onClick={this.closeEditView}
                        color="red"
                        inverted
                      />
                    </Button.Group>
                  </Card.Content>
                </Card>
              ) : (
                <Card key={index}>
                  <Card.Content>
                    <Card.Header>
                      {`${student.firstname} ${student.lastname}`}
                      <Button.Group compact basic floated="right" widths="1">
                        <Button
                          id={student._id}
                          icon
                          animated="vertical"
                          onClick={this.handleHire}
                          disabled={this.state.editStudent}
                        >
                          <Button.Content visible>
                            <Icon name="trophy" color="yellow" />
                          </Button.Content>
                          <Button.Content hidden>Hired!</Button.Content>
                        </Button>
                        <Button
                          id={student._id}
                          student={student}
                          name="openEditModal"
                          icon
                          animated="vertical"
                          onClick={this.openEditView}
                          disabled={this.state.editStudent}
                        >
                          <Button.Content visible>
                            <Icon name="wrench" />
                          </Button.Content>
                          <Button.Content hidden>Edit</Button.Content>
                        </Button>
                        <Button
                          id={student._id}
                          name="openDeleteModal"
                          icon
                          animated="vertical"
                          onClick={this.openModal}
                          disabled={this.state.editStudent}
                        >
                          <Button.Content visible>
                            <Icon name="trash" color="red" inverted />
                          </Button.Content>
                          <Button.Content hidden>Delete</Button.Content>
                        </Button>
                      </Button.Group>
                    </Card.Header>
                    <Card.Description>
                      <List>
                        <List.Item>
                          <Icon name="mail" />: {student.email}
                        </List.Item>
                        <List.Item>
                          <Icon name="github" />: {student.github}
                        </List.Item>
                      </List>
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            ) : null;
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
      dimmer="blurring"
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
