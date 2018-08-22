import React, {Component} from 'react'
import {Link} from "react-router-dom";
import './ClassList.css'
class CardClass extends Component {
    constructor(props) {
        super(props)
    }
    redirectEdit = () => {
        console.log(this.props.props.history)
        this.props.props.history.push(`/classlist/${this.props.classname}`)

    }
    redirectLeaderboard = () => {

    }

    render() {
        let countHired = 0;
        let notHired = 0;
        for (let i = 0; this.props.students.length > i; i++) {
            // console.log(this.props.students[i].hired.toString())
            if (this.props.students[i].hired.toString() === 'true') {
                countHired += 1;
            }
            if (this.props.students[i].hired.toString() === 'false') {
                notHired += 1;
            }
        }
        console.log(countHired, notHired)
        return (
            <div className="APP__CLASSCARD">
                <h5 className="APP__CNAME">{this.props.classname}</h5>
                <p className="APP__CPOP">Students: {this.props.students.length}</p>
                <p className="APP__CPART">Participation (Total): {}%</p>
                <p className="APP__CHIRED">Hired: {countHired}, Not Hired: {notHired}</p>
                <button onClick={this.redirectEdit} >Edit</button>
                <button onClick={this.redirectLeaderboard}>Leaderboard</button>
            </div>
        );
    }
}

export default CardClass
