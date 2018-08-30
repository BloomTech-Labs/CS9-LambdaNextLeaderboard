import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
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

  componentDidMount = () => {
    this.getStudents();
  };

  render() {
    console.log("PROPS===== ", this.props);
    return (
      <Segment.Group>
        <StudentList students={this.props.students} />
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
