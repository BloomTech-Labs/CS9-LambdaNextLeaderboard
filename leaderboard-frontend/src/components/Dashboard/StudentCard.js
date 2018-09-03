import React, {Component} from 'react';
// import {Button, Card, List} from "semantic-ui-react";
import {updateStudent} from '../../actions/studentActions'
import {connect} from 'react-redux';

import {
    Segment,
    Card,
    Button,
    List,
    Modal,
    Header,
    Input,
    Icon
} from "semantic-ui-react";
import './StudentCard.css'

class StudentCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: this.props.student.firstname,
            lastname: this.props.student.lastname,
            email: this.props.student.email,
            github: this.props.student.github,
            edit: false
        }
    }
    handleEdit = () => {
        this.setState({edit: !this.state.edit})
    }
    handleUpdate = () => {
        const studentObject = {
            lastname: this.state.last_name,
            firstname: this.state.first_name,
            email: this.state.email,
            github: this.state.github,
            id: this.props.student._id
        };
        this.props.updateStudent(studentObject);
        this.setState({edit: false})
    }
    handleInput = e => {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        if (this.state.edit === true) {
            return (
                <div>
                    <div className="Edit_Student">
                        <Input
                            focus
                            type="text"
                            name="last_name"
                            placeholder={this.props.student.lastname}
                            className="LName"
                            value={this.state.last_name}
                            onChange={this.handleInput}
                        />
                        <Input
                            focus
                            type="text"
                            name="first_name"
                            placeholder={this.props.student.firstname}
                            className="FName"
                            value={this.state.first_name}
                            onChange={this.handleInput}
                        />
                        <Input
                            focus
                            type="text"
                            name="email"
                            placeholder={this.props.student.email}
                            className="Email"
                            value={this.state.email}
                            onChange={this.handleInput}
                        />
                        <Input
                            focus
                            type="text"
                            name="github"
                            placeholder={this.props.student.github}
                            className="Github"
                            value={this.state.github}
                            onChange={this.handleInput}
                        />
                        <div>
                            <button onClick={this.handleUpdate} className="ui primary button BtnAdd">
                                Update
                            </button>
                            <Button onClick={this.handleEdit} negative className="ui primary button BtnAdd">
                                Cancel
                            </Button>
                        </div>

                    </div>
                </div>
            )
        }
        return (
            <div>
                <Card.Content>
                    <Card.Header>{`${this.props.student.firstname} ${
                        this.props.student.lastname
                        }`}</Card.Header>
                    <Card.Description>
                        <List>
                            <List.Item>Email Address: {this.props.student.email}</List.Item>
                            <List.Item>Github Handle: {this.props.student.github}</List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button
                        name={this.props.student._id}
                        icon="money"
                        content="Hired"
                        inverted
                        color="green"
                        size="small"
                        onClick={this.props.handleHire}
                    />
                    <Button
                        name={this.props.student._id}
                        icon="wrench"
                        content="Edit"
                        inverted
                        color="blue"
                        size="small"
                        onClick={this.handleEdit}
                        // disabled
                    />
                    <Button
                        id={this.props.student._id}
                        name="deleteModalOpen"
                        icon="trash"
                        content="Delete"
                        inverted
                        color="red"
                        size="small"
                        onClick={this.props.openModal}
                    />
                </Card.Content>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, {updateStudent})(StudentCard)
