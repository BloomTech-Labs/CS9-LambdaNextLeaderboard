import React, { Component } from "react";
import "./CreateEditClass.css";
// import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {
  addStudentAction,
  getClassesStudentsAction,
  postCsvClass
} from "../../actions";
import { Button, Input, Segment } from "semantic-ui-react";
// import StudentList from "./StudentList";

class ClassCreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_name: "",
      last_name: "",
      first_name: "",
      email: "",
      github: "",
      huntr: ""
    };
  }

  componentDidMount() {
    if (!this.props.allClasses) {
      this.props.getClassesStudentsAction();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.allClasses) {
      this.props.getClassesStudentsAction();
    }
  }

  handleInput = e => {
    // console.log([e.target.name] : e.target.value)
    e.preventDefault();
    // console.log(this.state.class_name)
    const { name, value } = e.target;
    console.log(name, value);

    this.setState({ [name]: value });
  };

  handleImportChange = e => {
    this.setState({
      csvFile: e.target.files[0]
    });
    console.log("CSV ready for upload.");
  };

  handleImportSubmit = e => {
    e.preventDefault();
    console.log("Fired");
    // Needs an action to send the data
    let classname = this.state.class_name;
    this.props.postCsvClass(this.state.csvFile, classname);
  };

  handleAdd = e => {
    e.preventDefault();
    let id;
    const path = this.props.props.props.match.params.name;
    this.props.allClasses.forEach(each => {
      if (each.name === path) {
        id = each._id;
      }
    });
    const studentObject = {
      lastname: this.state.last_name,
      firstname: this.state.first_name,
      email: this.state.email,
      github: this.state.github,
      huntr: this.state.huntr,
      _admin: localStorage.getItem("adminID"),
      _class: id,
      classname: path
    };
    // Send this studentObject when you click `Add`
    // for Create or Edit Class, Add Students part
    // console.log('fired', studentObject)
    // console.log('path', path)
    this.props.addStudentAction(path, studentObject);
    this.props.getClassesStudentsAction();
    // this.props.getClassStudentsAction("CS9")
    this.setState({
      class_name: "",
      last_name: "",
      first_name: "",
      email: "",
      github: "",
      huntr: ""
    });
    console.log(studentObject);
  };

  render() {
    return (
      <div className="ClassCreateEdit">
        <h5 style={{ display: "inline", marginLeft: "1%" }}>Settings</h5>
        <div className="Settings">
          <Input
            focus
            type="text"
            name="class_name"
            placeholder="Class Name"
            className="CName"
            value={this.state.class_name}
            onChange={this.handleInput}
          />

          {/* CSV IMPORT BOOKMARK */}
          <Segment basic>
            <form
              action="http://localhost:4000/create-edit"
              accept="*.csv"
              method="POST"
              encType="multipart/form-data"
            >
              <Input
                focus
                type="file"
                ref={input => {
                  this.filesInput = input;
                }}
                name="file"
                icon="file alternate outline"
                iconPosition="left"
                placeholder="UploadCSV"
                onChange={this.handleImportChange}
              />
              <Button
                className="ui clearing segment BtnImport"
                onClick={this.handleImportSubmit}
                primary
              >
                Upload CSV
              </Button>
            </form>
          </Segment>
        </div>

        <h5 style={{ display: "inline", marginLeft: "1%" }}>Add Students</h5>
        <div className="Add_Students">
          <Input
            focus
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="LName"
            value={this.state.last_name}
            onChange={this.handleInput}
          />

          <Input
            focus
            type="text"
            name="first_name"
            placeholder="First Name"
            className="FName"
            value={this.state.first_name}
            onChange={this.handleInput}
          />

          <Input
            focus
            type="text"
            name="email"
            placeholder="email"
            className="Email"
            value={this.state.email}
            onChange={this.handleInput}
          />

          <button onClick={this.handleAdd} className="ui primary button BtnAdd">
            Add
          </button>

          <Input
            focus
            type="text"
            name="github"
            placeholder="Github"
            className="Github"
            value={this.state.github}
            onChange={this.handleInput}
          />

          <Input
            focus
            type="text"
            name="huntr"
            placeholder="huntr"
            className="Huntr"
            value={this.state.huntr}
            onChange={this.handleInput}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    allClasses: state.allClasses
  };
};

export default connect(
  mapStateToProps,
  { addStudentAction, getClassesStudentsAction, postCsvClass }
)(ClassCreateEdit);
// export default ClassCreateEdit
