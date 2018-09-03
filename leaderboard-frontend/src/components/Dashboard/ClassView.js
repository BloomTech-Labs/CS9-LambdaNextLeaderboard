import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Card,
  Input,
  List,
  Button,
  Modal,
  Header
} from "semantic-ui-react";

// components
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

// actions
import { getClassStudents, addClassStudent } from "../../actions/classActions";
import { updateStudent, deleteStudent } from "../../actions/studentActions";

class ClassView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unhired: 0,
      hired: 0,
      total: 0,
      openEditModal: false
    };
  }

  getStudents = () => {
    this.props.getClassStudents({ id: this.props.classId });
  };

  setStudentCounts = students => {
    let count = 0;
    for (let i = 0; i < students.length; i++) {
      if (students[i].hired) break;
      count++;
    }
    this.setState({
      unhired: count,
      hired: students.length - count,
      total: students.length
    });
  };

  openModal = () => {
    this.setState({ openEditModal: true });
  };

  closeModal = () => {
    this.setState({ openEditModal: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    // New Students -> Settings counts
    if (this.props.students !== prevProps.students) {
      this.setStudentCounts(this.props.students);
    }

    // Selected Class was changed -> Updating Students
    if (this.props.classId && this.props.classId !== prevProps.classId) {
      this.getStudents();
    }

    // New Student created -> Updating Students
    if (
      this.props.createdStudent &&
      this.props.createdStudent !== prevProps.createdStudent
    ) {
      this.getStudents();
    }

    // Student updated -> Updating Students
    if (
      this.props.updatedStudent &&
      this.props.updatedStudent !== prevProps.updatedStudent
    ) {
      this.getStudents();
    }

    // Student deleted -> Updating Students
    if (
      this.props.deletedStudent &&
      this.props.deletedStudent !== prevProps.deletedStudent
    ) {
      this.getStudents();
    }
  };

  componentDidMount = () => {
    this.getStudents();
  };

  render() {
    return (
      <Segment.Group>
        <EditModal open={this.state.openEditModal} close={this.closeModal} />
        <Segment>
          <Card fluid color="blue">
            <Card.Content textAlign="center">
              <Card.Header textAlign="center">
                {this.props.className}
              </Card.Header>
              <List bulleted horizontal>
                <List.Item>Students: {this.state.unhired}</List.Item>
                <List.Item>Participation: 0%</List.Item>
                <List.Item>
                  Hired: {this.state.hired}/{this.state.total}
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content textAlign="center" extra>
              {this.state.unhired ? (
                <a
                  href="https://buddhaplex.github.io/leaderboard_sketches/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon="ordered list"
                    content="Leaderboard"
                    inverted
                    color="green"
                    size="large"
                  />
                </a>
              ) : null}
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
        {this.state.unhired ? (
          <Segment>
            <Input
              fluid
              icon="users"
              iconPosition="left"
              placeholder="Search students..."
            />
          </Segment>
        ) : null}
        {this.state.unhired ? (
          <StudentList
            students={this.props.students}
            updateStudent={this.props.updateStudent}
            deleteStudent={this.props.deleteStudent}
          />
        ) : null}
        <AddStudent
          classId={this.props.classId}
          addStudent={this.props.addClassStudent}
          addStudentErrors={this.props.newStudentErrors}
        />
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
      <Header icon="cog" content="Class Settings" />
      <Modal.Content content="Hello" />
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    students: state.classStudents,
    newStudentErrors: state.newStudentErrors,
    updatedStudent: state.updatedStudent,
    createdStudent: state.createdStudent,
    deletedStudent: state.deletedStudent,
      githubData: state.githubData,
      classToQuery: state.classToQuery
  };
};

export default connect(
  mapStateToProps,
  { getClassStudents, addClassStudent, updateStudent, deleteStudent }
)(ClassView);
