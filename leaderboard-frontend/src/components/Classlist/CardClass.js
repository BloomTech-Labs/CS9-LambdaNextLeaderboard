import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {redirectDataClass} from '../../actions'
import './ClassList.css'
class CardClass extends Component {
    constructor(props) {
        super(props)
    }
    redirectEdit = () => {
        console.log(this.props.props.history)
        this.props.props.history.push(`/classlist/${this.props.classname}`)
        this.props.redirectDataClass()

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
const mapStateToProps = state => {
    errors: state.errors
}
export default connect(mapStateToProps, {redirectDataClass})(CardClass)
