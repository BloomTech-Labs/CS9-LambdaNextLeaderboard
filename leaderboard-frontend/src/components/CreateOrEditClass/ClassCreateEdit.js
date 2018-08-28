import React, {Component} from "react";
import "./CreateEditClass.css";
// import { Button } from 'reactstrap';
import {connect} from "react-redux";
import {
    addStudentAction,
    updateStudentAction,
    getClassesStudentsAction,
    editStudentAction
} from "../../actions";
import {Button, Input} from "semantic-ui-react";
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
            this.props.getClassesStudentsAction()
        }
    }

    // componentWillUpdate(nextProps, nextState) {
    //
    // }


    handleInput = e => {
        // console.log([e.target.name] : e.target.value)
        e.preventDefault();
        // console.log(this.state.class_name)
        const {name, value} = e.target;
        console.log(name, value);

        this.setState({[name]: value});
    };
    handleImport = e => {
        e.preventDefault();
        console.log("Fired");
        // Needs an action to send the data
    };
    handleAdd = e => {
        e.preventDefault();
        let id
        const path = this.props.props.props.match.params.name;
        this.props.allClasses.forEach(each => {
            if (each.name === path) {
                id = each._id
            }
        })
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
        this.props.getClassesStudentsAction()
        // this.props.getClassStudentsAction("CS9")

        this.setState({
            class_name: "",
            last_name: "",
            first_name: "",
            email: "",
            github: "",
            huntr: "",
            edit: false
        });
    };
    handleEdit = e => {
        e.preventDefault();
        let id
        const path = this.props.props.props.match.params.name;
        this.props.allClasses.forEach(each => {
            if (each.name === path) {
                id = each._id
            }
        })
        console.log(this.props.editStudent)

        const studentObject = {
            lastname: this.state.last_name,
            firstname: this.state.first_name,
            email: this.state.email,
            github: this.state.github,
            huntr: this.state.huntr,
            _admin: localStorage.getItem("adminID"),
            _class: id,
            classname: path,
            _id: this.props.editStudent._id

        };
        console.log(studentObject);
        this.props.updateStudentAction(path, studentObject);
        this.props.getClassesStudentsAction();
        this.setState({
            class_name: "",
            last_name: "",
            first_name: "",
            email: "",
            github: "",
            huntr: "",
            edit: false
        });

    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.editStudent && this.props.editStudent === null) {
            this.setState({
                last_name: nextProps.editStudent.lastname,
                first_name: nextProps.editStudent.firstname,
                email: nextProps.editStudent.email,
                github: nextProps.editStudent.github,
                huntr: nextProps.editStudent.huntr,
                edit: true
            })
        }
        if (!this.props.allClasses) {
            this.props.getClassesStudentsAction()
        }
        if (this.props.editStudent !== null && nextProps.editStudent !== this.props.editStudent && nextProps.editStudent !== null) {
            this.setState({
                last_name: nextProps.editStudent.lastname,
                first_name: nextProps.editStudent.firstname,
                email: nextProps.editStudent.email,
                github: nextProps.editStudent.github,
                huntr: nextProps.editStudent.huntr,
                edit: true
            })
        }
    }

    handleCancel = () => {
        this.props.editStudentAction(null);
        this.setState({
            class_name: "",
            last_name: "",
            first_name: "",
            email: "",
            github: "",
            huntr: "",
            edit: false
        });
    }


    render() {
        if (this.props.editStudent) {
            return (
                <div className="ClassCreateEdit">
                    <h5 style={{display: "inline", marginLeft: "1%"}}>Settings</h5>
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

                        <Button
                            className="ui clearing segment BtnImport"
                            onClick={this.handleImport}
                            primary
                        >
                            {" "}
                            Import CSV
                        </Button>
                        <form
                            action="http://localhost:4000/create-edit"
                            method="POST"
                            encType="multipart/form-data"
                        >
                            <input type="file" name="file" accept="*.csv"/>
                            <input type="submit" value="Upload Students"/>
                        </form>
                        {/*<button className="BtnImport" onClick={this.handleImport} >Import CSV</button>*/}
                    </div>

                    <h5 style={{display: "inline", marginLeft: "1%"}}>Add Students</h5>
                    <div className="Add_Students">
                        <Input
                            focus
                            type="text"
                            name="last_name"
                            placeholder={this.props.editStudent.lastname}
                            className="LName"
                            value={this.state.last_name}
                            onChange={this.handleInput}
                        />

                        <Input
                            focus
                            type="text"
                            name="first_name"
                            placeholder={this.props.editStudent.firstname}
                            className="FName"
                            value={this.state.first_name}
                            onChange={this.handleInput}
                        />

                        <Input
                            focus
                            type="text"
                            name="email"
                            placeholder={this.props.editStudent.email}
                            className="Email"
                            value={this.state.email}
                            onChange={this.handleInput}
                        />



                        <Input
                            focus
                            type="text"
                            name="github"
                            placeholder={this.props.editStudent.github}
                            className="Github"
                            value={this.state.github}
                            onChange={this.handleInput}
                        />

                        <Input
                            focus
                            type="text"
                            name="huntr"
                            placeholder={this.props.editStudent.huntr}
                            className="Huntr"
                            value={this.state.huntr}
                            onChange={this.handleInput}
                        />
                        <button onClick={this.handleEdit} className="ui primary button BtnAdd">
                            Update
                        </button>
                        <Button onClick={this.handleCancel} negative className="ui primary button BtnAdd">
                            Cancel
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="ClassCreateEdit">
                    <h5 style={{display: "inline", marginLeft: "1%"}}>Settings</h5>
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

                        <Button
                            className="ui clearing segment BtnImport"
                            onClick={this.handleImport}
                            primary
                        >
                            {" "}
                            Import CSV
                        </Button>
                        <form
                            action="http://localhost:4000/create-edit"
                            method="POST"
                            encType="multipart/form-data"
                        >
                            <input type="file" name="file" accept="*.csv"/>
                            <input type="submit" value="Upload Students"/>
                        </form>
                        {/*<button className="BtnImport" onClick={this.handleImport} >Import CSV</button>*/}
                    </div>

                    <h5 style={{display: "inline", marginLeft: "1%"}}>Add Students</h5>
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
}

const mapStateToProps = state => {
    return {
        error: state.error,
        allClasses: state.allClasses,
        editStudent: state.editStudent
    };
};

export default connect(
    mapStateToProps,
    {
        addStudentAction,
        getClassesStudentsAction,
        updateStudentAction,
        editStudentAction
    }
)(ClassCreateEdit);
// export default ClassCreateEdit
