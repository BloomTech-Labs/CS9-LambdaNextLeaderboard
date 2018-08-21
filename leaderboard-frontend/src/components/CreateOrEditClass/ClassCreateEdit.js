import React, { Component } from 'react'
import './CreateEditClass.css'
// import { Button } from 'reactstrap';
import {connect} from 'react-redux'
import {addStudentAction, getClassStudentsAction} from '../../actions'
import { Button, Input } from 'semantic-ui-react'
import StudentList  from './StudentList'
class ClassCreateEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class_name: '',
            last_name: '',
            first_name: '',
            email: '',
            github: '',
            huntr: ''
        }
    }
    handleInput = e => {
        // console.log([e.target.name] : e.target.value)
        e.preventDefault()
        // console.log(this.state.class_name)
        const { name, value } = e.target
        console.log(name, value)

        this.setState({ [name]: value })
    }
    handleImport = e => {
        e.preventDefault();
        console.log("Fired")
        //Needs an action to send the data

    }
    handleAdd = e => {
        e.preventDefault();
        const studentObject = {
            lastname : this.state.last_name,
            firstname : this.state.first_name,
            email: this.state.email,
            github: this.state.github,
            huntr: this.state.huntr
        }
        // Send this studentObject when you click `Add`
        // for Create or Edit Class, Add Students part
        this.props.addStudentAction("CS9", studentObject)
        // this.props.getClassStudentsAction("CS9")
        this.setState({class_name: '', last_name: '', first_name: '', email: '', github: '', huntr: ''})
        console.log(studentObject)
    }
    render() {
        return (
            <div className="ClassCreateEdit" >
                <h5 style={{display:"inline", marginLeft: "1%"}} >Settings</h5>
                <div className="Settings" >

                    <Input focus
                           type="text"
                           name="class_name"
                           placeholder="Class Name"
                           className="CName"
                           value={this.state.class_name}
                           onChange={this.handleInput}
                    />

                    <Button className="ui clearing segment BtnImport" onClick={this.handleImport}  primary> Import CSV</Button>
                    {/*<button className="BtnImport" onClick={this.handleImport} >Import CSV</button>*/}
                </div>

                <h5 style={{display:"inline", marginLeft: "1%"}} >Add Students</h5>
                <div className="Add_Students" >

                    <Input focus
                           type="text"
                           name="last_name"
                           placeholder="Last Name"
                           className="LName"
                           value={this.state.last_name}
                           onChange={this.handleInput}
                    />

                    <Input focus
                           type="text"
                           name="first_name"
                           placeholder="First Name"
                           className="FName"
                           value={this.state.first_name}
                           onChange={this.handleInput}
                    />

                    <Input focus
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

                    <Input focus
                           type="text"
                           name="github"
                           placeholder="Github"
                           className="Github"
                           value={this.state.github}
                           onChange={this.handleInput}
                    />

                    <Input focus
                           type="text"
                           name="huntr"
                           placeholder="huntr"
                           className="Huntr"
                           value={this.state.huntr}
                           onChange={this.handleInput}
                    />
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps, {addStudentAction, getClassStudentsAction})(ClassCreateEdit)
// export default ClassCreateEdit
