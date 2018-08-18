import React, {Component} from 'react';
import {connect} from "react-redux";

import  './StudentList.css'
import StudentsDisplay from "./StudentsDisplay";

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            students: [
                {name :"ASmith"}, {name :"BSmith"}, {name :"CSmit"}, {name :"DSmith"}, {name :"ESmith"}, {name :"FSmith"}, {name :"GSmith"}, {name :"HSmith"}, {name :"ISmith"}, {name :"JSmit"}
            ]
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    delete = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="main"  >
                {this.state.students.map((each, i) => {
                   return <StudentsDisplay key={each + i} name={each} />
                })}

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {

    }
}

export default StudentList