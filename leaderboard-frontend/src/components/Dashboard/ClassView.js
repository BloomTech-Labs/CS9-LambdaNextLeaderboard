import React, { Component } from "react";
import { Segment, Card, Input, List, Button } from "semantic-ui-react";
import { connect } from "react-redux";

// components
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

// actions
import { getClassStudents, addClassStudent } from "../../actions/classActions";

class ClassView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStudents = () => {
    this.props.getClassStudents({ id: this.props.classId });
  };

  componentWillReceiveProps = nextProps => {
    console.log("Receiving =====", this.props, nextProps);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // New Student created -> Updating Students
    if (
      this.props.createdStudent &&
      this.props.createdStudent !== prevProps.createdStudent
    ) {
      this.getStudents();
    }

    // Selected Class was changed -> Updating Students
    if (this.props.classId && this.props.classId !== prevProps.classId) {
      this.getStudents();
    }
  };

  componentDidMount = () => {
    this.getStudents();
  };

  render() {
    console.log("PROPS===== ", this.props);
    return (
      <Segment.Group>
        <Segment>
          <Card fluid color="blue">
            <Card.Content textAlign="center">
              <Card.Header textAlign="center">
                {this.props.className}
              </Card.Header>
              <List bulleted horizontal>
                <List.Item>Students: {this.props.students.length}</List.Item>
                <List.Item>Participation: 0%</List.Item>
                <List.Item>
                  Hired: 0/
                  {this.props.students.length}
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
              />
              {this.props.students.length ? (
                <Button
                  icon="ordered list"
                  content="Leaderboard"
                  inverted
                  color="green"
                  size="large"
                />
              ) : null}
            </Card.Content>
          </Card>
        </Segment>
        {this.props.students.length ? (
          <Segment>
            <Input
              fluid
              icon="users"
              iconPosition="left"
              placeholder="Seach students..."
            />
          </Segment>
        ) : null}
        {this.props.students.length ? (
          <StudentList students={this.props.students} />
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
    createdStudent: state.createdStudent
  };
};

export default connect(
  mapStateToProps,
  { getClassStudents, addClassStudent }
)(ClassView);
