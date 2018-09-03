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
import StudentCard from "./StudentCard";

export default class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStudent: "",
      openEditModal: false,
      openDeleteModal: false
    };
  }

  openModal = (e, { id, name }) => {
    this.setState({ [name]: !this.state[name], selectedStudent: id });
  };

  closeModal = () => {
    this.setState({
      openEditModal: false,
      openDeleteModal: false,
      selectedStudent: ""
    });
  };

  handleHire = (e, { name }) => {
    this.props.updateStudent({ id: name, hired: true });
  };

  handleDelete = () => {
    this.props.deleteStudent({ id: this.state.selectedStudent });
  };

  render() {
    return (
      <Segment>
        <DeleteModal
          open={this.state.openDeleteModal}
          close={this.closeModal}
          selected={this.state.selectedStudent}
          delete={this.handleDelete}
        />
        <EditModal
          open={this.state.openEditModal}
          close={this.closeModal}
          selected={this.state.selectedStudent}
        />
        <Card.Group itemsPerRow="2" stackable>
          {this.props.students.map((student, index) => {
            return !student.hired ? (
              <Card key={index}>
                  <StudentCard student={student} handleHire={this.handleHire} openModal={this.openModal} />

                {/*<Card.Content>*/}
                  {/*<Card.Header>{`${student.firstname} ${*/}
                    {/*student.lastname*/}
                  {/*}`}</Card.Header>*/}
                  {/*<Card.Description>*/}
                    {/*<List>*/}
                      {/*<List.Item>Email Address: {student.email}</List.Item>*/}
                      {/*<List.Item>Github Handle: {student.github}</List.Item>*/}
                    {/*</List>*/}
                  {/*</Card.Description>*/}
                {/*</Card.Content>*/}
                {/*<Card.Content extra>*/}
                  {/*<Button*/}
                    {/*name={student._id}*/}
                    {/*icon="money"*/}
                    {/*content="Hired"*/}
                    {/*inverted*/}
                    {/*color="green"*/}
                    {/*size="small"*/}
                    {/*onClick={this.handleHire}*/}
                  {/*/>*/}
                  {/*<Button*/}
                    {/*id={student._id}*/}
                    {/*name="openEditModal"*/}
                    {/*icon="wrench"*/}
                    {/*content="Edit"*/}
                    {/*inverted*/}
                    {/*color="blue"*/}
                    {/*size="small"*/}
                    {/*onClick={this.openModal}*/}
                  {/*/>*/}
                  {/*<Button*/}
                    {/*id={student._id}*/}
                    {/*name="openDeleteModal"*/}
                    {/*icon="trash"*/}
                    {/*content="Delete"*/}
                    {/*inverted*/}
                    {/*color="red"*/}
                    {/*size="small"*/}
                    {/*onClick={this.openModal}*/}
                  {/*/>*/}
                {/*</Card.Content>*/}
              </Card>
            ) : null;
          })}
        </Card.Group>
      </Segment>
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
      <Header icon="wrench" content="Edit Student" />
      <Modal.Content content="Hello" />
    </Modal>
  );
};

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
