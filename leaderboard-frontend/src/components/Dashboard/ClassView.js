import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Segment,
  Input,
  List,
  Button,
  Modal,
  Header,
  Label,
  Form,
  Card
} from "semantic-ui-react";

// components
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import LeaderBoard from "../Leaderboard/LeaderBoard";

// actions
import {
  getClassStudents,
  queryStudents,
  addClassStudent,
  postCsvStudents
} from "../../actions/classActions";

import Settings from "../Settings/Settings";

import { updateStudent, deleteStudent } from "../../actions/studentActions";
import {
  getGithubDataAction,
  setClassForQuery,
  setSettingsAction
} from "../../actions";

class ClassView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unhired: 0,
      hired: 0,
      total: 0,
      searchable: true,
      openEditModal: false,
      leaderboard: false,
      settings: false
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

  queryStudents = (e, { value }) => {
    this.props.queryStudents({ id: this.props.classId, query: value });
  };

  toggleSearchable = () => {
    this.setState({ searchable: !this.state.searchable });
  };

  openModal = () => {
    this.setState({ openEditModal: true });
  };

  closeModal = () => {
    this.setState({ openEditModal: false });
  };

  getData = () => {
    console.log("Send data", this.props.props.history, this.props.classId);
    // this.props.getGithubDataAction(this.props.classId)
    this.props.setClassForQuery(this.props.classId);
  };

  setSettings = () => {
    this.setState({ settings: true });
    this.props.setSettingsAction(true);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // New Students -> Settings counts
    if (this.props.students !== prevProps.students) {
      this.setStudentCounts(this.props.students);
      this.addStudentComponent.clearForm();
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
componentWillUpdate = (nextProps, nextState) => {
  if (nextProps.classToQuery !== null &&
    this.props.classToQuery !== nextProps.classToQuery) {
    console.log("Ready to FIre, this.props.classToQuery",
    nextProps.classToQuery,
      this.props
    );
    this.setState({ leaderboard: true });
  }
}

  

  componentDidMount = () => {
    this.getStudents();
  };

  render() {
    if (this.state.leaderboard === true && this.props.classToQuery !== null) {
      return (
          <LeaderBoard/>
      )
  }
  if (this.state.settings === true && this.props.changeSettings === true) {
      return (
          <Settings/>

          )
  }
    return (
      <Segment.Group>
        <EditModal open={this.state.openEditModal} close={this.closeModal} />
        <Segment inverted color="blue">
          <Header as="h2" content="Class View" textAlign="center" />
        </Segment>
        <Segment textAlign="center">
          <Header textAlign="center">{this.props.className}</Header>
          <List bulleted horizontal>
            <List.Item>Students: {this.state.unhired}</List.Item>
            <List.Item>Participation: 0%</List.Item>
            <List.Item>
              Hired: {this.state.hired}/{this.state.total}
            </List.Item>
          </List>
        </Segment>
        <Segment textAlign="center">
          {this.state.unhired ? (
            
              <Button
                icon="ordered list"
                content="Leaderboard"
                inverted
                color="green"
                size="large"
                onClick={this.getData}
              />
          ) : null}
          <Button
            icon="cog"
            content="Settings"
            inverted
            color="blue"
            size="large"
            onClick={this.setSettings}
          />
        </Segment>
        {this.props.queryingStudents || this.state.unhired ? (
          <Segment>
            <Form>
              <Form.Field>
                {this.props.students &&
                !this.state.unhired &&
                this.props.queryingStudents ? (
                  <Label
                    pointing="below"
                    content="No students found"
                    color="orange"
                  />
                ) : null}
                <Input
                  fluid
                  icon="users"
                  iconPosition="left"
                  placeholder="Search students..."
                  disabled={!this.state.searchable}
                  onChange={this.queryStudents}
                />
              </Form.Field>
            </Form>
          </Segment>
        ) : null}
        {this.state.unhired ? (
          <StudentList
            className={this.props.className}
            students={this.props.students}
            updateStudent={this.props.updateStudent}
            deleteStudent={this.props.deleteStudent}
            toggleSearch={this.toggleSearchable}
          />
        ) : null}
        <Segment>
          <AddStudent
            onRef={ref => (this.addStudentComponent = ref)}
            classId={this.props.classId}
            addStudent={this.props.addClassStudent}
            addStudentErrors={this.props.newStudentErrors}
            postCsvStudents={this.props.postCsvStudents}
          />
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
      <Header icon="cog" content="Class Settings" />
      <Modal.Content content="Hello" />
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    students: state.classStudents,
    queryingStudents: state.queryingStudents,
    newStudentErrors: state.newStudentErrors,
    updatedStudent: state.updatedStudent,
    createdStudent: state.createdStudent,
    deletedStudent: state.deletedStudent,
    githubData: state.githubData,
    classToQuery: state.classToQuery,
    changeSettings: state.changeSettings
  };
};

export default connect(
  mapStateToProps,
  {
    getClassStudents,
    queryStudents,
    addClassStudent,
    updateStudent,
    deleteStudent,
    postCsvStudents,
    setSettingsAction,
    getGithubDataAction,
    setClassForQuery
  }
)(ClassView);
