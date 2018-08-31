import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Segment, Card, Input, List, Button } from "semantic-ui-react";

// components
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

// actions
import { getClassStudents, addClassStudent } from "../../actions/classActions";
import { updateStudent, deleteStudent } from "../../actions/studentActions";

class ClassView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStudents = () => {
    this.props.getClassStudents({ id: this.props.classId });
  };

  componentDidUpdate = (prevProps, prevState) => {
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
    console.log(this.props);
    return (
      <Segment.Group>
        <Segment>
          <Card fluid color="blue">
            <Card.Content textAlign="center">
              <Card.Header textAlign="center">
                {this.props.className}
              </Card.Header>
              <List bulleted horizontal>
                <List.Item>
                  Students: {this.props.students.unhired.length}
                </List.Item>
                <List.Item>Participation: 0%</List.Item>
                <List.Item>
                  Hired: {this.props.students.hired.length}/
                  {this.props.students.unhired.length +
                    this.props.students.hired.length}
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
                disabled
              />
              {this.props.students.unhired.length ? (
                <Link to="/leaderboard">
                  <Button
                    icon="ordered list"
                    content="Leaderboard"
                    inverted
                    color="green"
                    size="large"
                  />
                </Link>
              ) : null}
            </Card.Content>
          </Card>
        </Segment>
        {this.props.students.unhired.length ? (
          <Segment>
            <Input
              fluid
              icon="users"
              iconPosition="left"
              placeholder="Seach students..."
            />
          </Segment>
        ) : null}
        {this.props.students.unhired.length ? (
          <StudentList
            students={this.props.students.unhired}
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

const mapStateToProps = state => {
  return {
    students: state.classStudents,
    newStudentErrors: state.newStudentErrors,
    updatedStudent: state.updatedStudent,
    createdStudent: state.createdStudent,
    deletedStudent: state.deletedStudent
  };
};

export default connect(
  mapStateToProps,
  { getClassStudents, addClassStudent, updateStudent, deleteStudent }
)(ClassView);
